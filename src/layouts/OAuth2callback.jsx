import React, { useState, useEffect } from "react";
import Topbar from "../components/common/Topbar";
import service from "../services/service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../Sass/OAuth2callback.scss";

export default function OAuth2callback() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const code = new URLSearchParams(window.location.search).get("code");

    if (code) {
      handleOAuthCallback(code);
    }
  }, []);

  const handleOAuthCallback = async (code) => {
    try {
      const responseGoogleCallback = await service.Google_callback(code);

      if (responseGoogleCallback.data.message === "redirect to complete user") {
        const userData = await showProfileCompletionForm(
          responseGoogleCallback.data.data
        );

        if (userData) {
          const response =
            await service.Google_callback_Complete_Profile_And_Username(
              userData
            );

          handleProfileCompletionResponse(response);
        } else {
          console.log("El usuario canceló el formulario.");
        }
      }

      if (responseGoogleCallback.data.message === "token") {
        handleAuthenticatedUser(responseGoogleCallback.data);
      }
    } catch (error) {
      console.error("Error al manejar el callback de Google:", error);
    }
  };

  const showProfileCompletionForm = async (email) => {
    try {
      const nameUser = prompt("Ingrese su nombre de usuario:");

      if (nameUser === null) {
        return null;
      }

      return {
        nameUser,
        email,
        // Otros campos del formulario...
      };
    } catch (error) {
      console.error("Error al mostrar el formulario de perfil:", error);
      return null;
    }
  };

  const handleProfileCompletionResponse = (response) => {
    if (response.data.message === "token") {
      window.localStorage.setItem("loggedAppUser", response.data.data);
      window.localStorage.setItem("_id", response.data._id);
      service.setToken(response.data.data);
      toast.success("Ingresó a la aplicación correctamente.");
      navigate("/home");
    } else {
      console.log("Otro tipo de respuesta:", response.data);
    }
  };

  const handleAuthenticatedUser = (userData) => {
    // Lógica para manejar un usuario autenticado con token.
    console.log("Usuario autenticado:", userData);
    navigate("/home");
    // Puedes realizar otras acciones si es necesario.
  };

  return (
    <div>
      <Topbar currentUser={currentUser} />
    </div>
  );
}
