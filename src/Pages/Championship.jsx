import React, { useEffect, useState } from "react";
import ChampionshipComponent from "../components/ChampionshipComponent";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";

export default function Championship({ currentUser }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
      if (currentUser.avatar) {
        navigate("/");
      } else {
        setLoading(false);
      }
  }, []);
  return loading ? <Loader /> : <ChampionshipComponent currentUser={currentUser} />
}
