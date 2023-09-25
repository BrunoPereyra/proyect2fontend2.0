import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

import ChatComunidad from "../components/ChatComunidad";
import Topbar from "../components/common/Topbar";

export default function Chats() {
  const [chatsTheUser, setChatsTheUser] = useState([]);
  const [UserIdStorage, setUserIdStorage] = useState("");
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();
  const [ChatWithOneUser, setChatWithOneUser] = useState({
    state: false,
    OnechatId: "",
  });

  useEffect(() => {
    // let loggedUser = window.localStorage.getItem("loggedAppUser")
    // if (loggedUser) {
    //     const userStorage = JSON.parse(loggedUser)
    //     setUserIdStorage(userStorage.id)
    //     service.setToken(userStorage.token)
    // } else {
    //     // navigate("/login")
    // }
    // if (!searchParams.get("idChatUser")) {
    //     async function getChats() {
    //         try {
    //             const AllChats = await service.GetAllChats()
    //             setChatsTheUser(AllChats.data)
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    //     getChats()
    // } else {
    const paramsWithIdUser = searchParams.get("iduser");
    setChatWithOneUser({ state: true, OnechatId: paramsWithIdUser });

    // }
  }, []);
  function ChatbetweenUserAB(idUserChat) {
    setChatWithOneUser({ state: true, OnechatId: idUserChat });
  }
  function ChatsTheUser() {
    return (
      <div className="Chats_section_ChatsTheUser">
        {chatsTheUser.map((c) => {
          let showCorrectRegardingIdStoragevar = null;
          function showCorrectRegardingIdStorage() {
            if (UserIdStorage === c.members[0]._id) {
              showCorrectRegardingIdStoragevar = c.members[1];
            } else if (UserIdStorage === c.members[1]._id) {
              showCorrectRegardingIdStoragevar = c.members[0];
            }
          }
          showCorrectRegardingIdStorage();
          return (
            <div key={showCorrectRegardingIdStoragevar._id}>
              <h1 onClick={() => ChatbetweenUserAB("")}>
                {showCorrectRegardingIdStoragevar.nameUser}
              </h1>
            </div>
          );
        })}
      </div>
    );
  }
  return (
    <div>
      <Topbar currentUser={"currentUser"} />
      <section id="Chats_section">
        <ChatComunidad userId={"650e407fc8e5475fce111e7f"} />
      </section>
    </div>
  );
}
