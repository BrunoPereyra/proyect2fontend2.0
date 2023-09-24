import React, { useEffect, useState } from "react";
import Topbar from "../components/common/Topbar";
import Profile from "../components/Profile";
import service from "../services/service";
import Championship from "../Pages/Championship";
export default function Match() {
  const [currentUser, setCurrentUser] = useState({});
  const [userList, setUserList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);

  async function funcsetCurrentUser() {
    let loggedUser = window.localStorage.getItem("loggedAppUser");
    let id = window.localStorage.getItem("_id");

    if (loggedUser) {
      service.setToken(loggedUser);
      setCurrentUserId(id);
    } else {
      navigate("/login");
    }
  }

  async function MatchUsers() {
    let res = await service.MatchUser();
    setUserList(res.data.data);
    console.log(res.data.data);
  }

  useEffect(() => {
    funcsetCurrentUser();
    MatchUsers();
  }, []);

  const showNextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % userList.length);
  };

  return (
    <div>
      <Topbar currentUser={currentUser} />
      <div className="user-profile">
        <Profile user={userList[currentIndex]} currentUserId={currentUserId} />
      </div>
      <button onClick={showNextProfile}>Siguiente Perfil</button>
    </div>
  );
}
