import React, { useState } from "react";
import Topbar from "../components/common/Topbar";
import service from "../services/service";
import "../Sass/OAuth2.scss";

export default function OAuth2Login() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleGoogleLogin = async () => {
    try {
      const googleLoginURL = await service.GoogleLoginURL();
      window.location.href = googleLoginURL.data.redirect;
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <div>
      <Topbar currentUser={currentUser} />
      <button onClick={handleGoogleLogin}>Iniciar sesión con Google</button>
    </div>
  );
}
