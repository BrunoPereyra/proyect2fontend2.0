import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import service from "../services/service";

export default function ChatComunidad({ chatId }) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const [socket, setSocket] = useState(null);
  async function funcsetCurrentUser() {
    let loggedUser = window.localStorage.getItem("loggedAppUser");

    if (loggedUser) {
      service.setToken(loggedUser);
    } else {
      navigate("/login");
    }
  }
  useEffect(() => {
    funcsetCurrentUser();
    const connectWebSocket = () => {
      const newSocket = new WebSocket(
        `ws://localhost:8081/ws/chatStreaming/${chatId}/bruno2`
      );

      newSocket.onmessage = (event) => {
        const receivedMessage = JSON.parse(event.data);
        newSocket.send("onmessage");

        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      };

      newSocket.onclose = () => {
        console.log("WebSocket connection closed");
        newSocket.send("closing");
      };

      newSocket.onopen = () => {
        console.log("WebSocket connection opened");
        const newMessage = {
          message: message,
          userId: "randomString",
        };
        if (newMessage.message === "") newMessage.message = "presentación";
        newSocket.send(JSON.stringify(newMessage));
      };
      setSocket(newSocket);
    };
    if (!socket || socket.readyState !== WebSocket.OPEN) {
      console.log("Establecer la conexión WebSocket");
      connectWebSocket();
    }

    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const sendMessage = async () => {
    try {
      const data = {
        message: message,
        chatId: chatId,
      };
      const res = service.SendMessageChat(data);
      setMessage("");
    } catch (error) {
      setMessage("");

      console.log(error);
    }
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <div className="">
      <div className="Conversation">
        {messages.map((message, index) => (
          <div key={index} className="Message">
            <span className="UserId">{message.userId}: </span>
            <div className="MessagesChat">
              <div className="imgs">
                {message.EmotesChat.Moderator && (
                  <img src={message.EmotesChat.Moderator} alt="" />
                )}
                {message.EmotesChat.Verified && (
                  <img src={message.EmotesChat.Verified} alt="" />
                )}
                {message.EmotesChat.Vip && (
                  <img src={message.EmotesChat.Vip} alt="" />
                )}
              </div>
              <div className="sas">
                {/* <div className="sas"> */}

                <p style={{ color: message.Color, margin: "10px" }}>
                  {message.nameUser}
                </p>

                <span style={{ color: message.Color, marginLeft: "40px" }}>
                  {message.message}
                </span>
                {/* </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>
      <form className="FormChat" onSubmit={handleSubmit}>
        <input
          style={{
            width: "100%",
            height: "200px",
            zIndex: "1000",
            backgroundColor: "green",
          }}
          type="text"
          value={message}
          onChange={handleChange}
        />
        <button
          style={{ width: "100%", height: "200px", backgroundColor: "blue" }}
          type="submit"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
