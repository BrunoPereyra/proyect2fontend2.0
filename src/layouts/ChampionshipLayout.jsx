import React, { useEffect, useState } from "react";
import Topbar from "../components/common/Topbar";

import service from "../services/service";
import Championship from "../Pages/Championship";

export default function ChampionshipLayout() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    async function funcsetCurrentUser() {
      let cachedUser = window.localStorage.getItem("cachedAppUser");
      if (cachedUser) {
        setCurrentUser(JSON.parse(cachedUser));
      } else {
        let loggedUser = window.localStorage.getItem("loggedAppUser");
        if (loggedUser) {
          const userStorage = JSON.parse(loggedUser);
          console.log(loggedUser);
          service.setToken(userStorage.token);
        } else {
          navigate("/login");
        }
      }
    }

    funcsetCurrentUser();
  }, []);

  return (
    <div>
      <Topbar currentUser={currentUser} />
      <Championship currentUser={currentUser} />
    </div>
  );
}
