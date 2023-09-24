import React, { useEffect, useState } from "react";
import Topbar from "../components/common/Topbar";
import Profile from "../Pages/Profile";
import service from "../services/service";
import "../Sass/match.scss";

export default function ProfileLayout() {
  const [currentUser, setCurrentUser] = useState({});

  async function funcsetCurrentUser() {
    let loggedUser = window.localStorage.getItem("loggedAppUser");
    if (loggedUser) {
      const userStorage = JSON.parse(loggedUser);
      service.setToken(userStorage.token);
      const res = await service.Currentuser();
      setCurrentUser(res.data.data);
    } else {
      navigate("/login");
    }
  }

  useEffect(() => {
    funcsetCurrentUser();
  }, []);

  return (
    <div>
      <Topbar currentUser={currentUser} />
      <Profile currentUser={currentUser} />
    </div>
  );
}
