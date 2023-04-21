import React, { useEffect, useState } from "react";
import Home from "../Pages/Home";
import Topbar from "../components/common/Topbar";
import service from '../services/service';

export default function HomeLayout() {
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
          service.setToken(userStorage.token);
          const res = await service.Currentuser()
          setCurrentUser(res.data.data);
          window.localStorage.setItem("cachedAppUser", JSON.stringify(res.data.data));
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
      <Home currentUser={currentUser} />
    </div>
  );
}
