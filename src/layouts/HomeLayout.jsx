import React, { useEffect, useState } from "react";
import Home from "../Pages/Home";
import Topbar from "../components/common/Topbar";
import service from "../services/service";

export default function HomeLayout() {
  useEffect(() => {
    async function funcsetCurrentUser() {
      let loggedUser = window.localStorage.getItem("loggedAppUser");
      if (loggedUser) {
        const userStorage = loggedUser;
        service.setToken(userStorage.token);
      } else {
        navigate("/login");
      }
    }

    funcsetCurrentUser();
  }, []);

  return (
    <div>
      <Topbar />
      <Home />
    </div>
  );
}
