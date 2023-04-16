import React, { useEffect, useState } from "react";
import ProfileComponent from "../components/ProfileComponent";
import { useNavigate } from "react-router-dom";
import Loader from "../components/common/Loader";

export default function Profile({ currentUser }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  console.log(currentUser);
  useEffect(() => {
      if (currentUser.id) {
        navigate("/");
      } else {
        setLoading(false);
      }
  }, []);
  return loading ? <Loader /> : <ProfileComponent currentUser={currentUser} />;
}
