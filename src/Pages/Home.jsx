import React, { useEffect, useState } from "react";
import HomeComponent from "../components/HomeComponent";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";

export default function Home({ currentUser }) {
  console.log(currentUser);
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
      if (currentUser.avatar) {
        navigate("/");
      } else {
        setLoading(false);
      }
  }, []);
  return loading ? <Loader /> : <HomeComponent currentUser={currentUser} />;
}
