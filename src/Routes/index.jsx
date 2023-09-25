import { createBrowserRouter } from "react-router-dom";
import Login from "../Pages/Login";
import Match from "../layouts/Match";
import Chats from "../layouts/Chats";
import Register from "../Pages/Register";
import HomeLayout from "../layouts/HomeLayout";
import ProfileLayout from "../layouts/ProfileLayout";
import ConnectionLayout from "../layouts/ConnectionLayout";
import ChampionshipLayout from "../layouts/ChampionshipLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/home",
    element: <HomeLayout />,
  },
  {
    path: "/profile",
    element: <ProfileLayout />,
  },
  {
    path: "/connections",
    element: <ConnectionLayout />,
  },
  {
    path: "/championship",
    element: <ChampionshipLayout />,
  },
  {
    path: "/match",
    element: <Match />,
  },
  {
    path: "/Chats",
    element: <Chats />,
  },
]);
