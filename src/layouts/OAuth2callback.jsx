import React, { useState, useEffect } from "react";
import Topbar from "../components/common/Topbar";
import service from "../services/service";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../Sass/OAuth2callback.scss";

export default function OAuth2callback() {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [showUsernameForm, setShowUsernameForm] = useState(false);
  const [username, setUsername] = useState("");
  const [biography, setBiography] = useState("");
  const [email, setEmail] = useState("");
  const [pais, setPais] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [headImage, setHeadImage] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [sex, setSex] = useState("");
  const [situation, setSituation] = useState("");
  const [selectedInstruments, setSelectedInstruments] = useState({});
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [experience, setExperience] = useState(0);
  const [zodiacSign, setZodiacSign] = useState("");

  // Lista de opciones para Instruments y Genres
  const instrumentOptions = ["Guitarra", "Piano", "Batería", "Bajo", "Otro"];
  const genreOptions = ["Rock", "Trap", "Rap", "Pop", "Electrónica", "Otros"];

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
        setEmail(responseGoogleCallback.data.data);

        // Show the username form
        setShowUsernameForm(true);
      }

      if (responseGoogleCallback.data.message === "token") {
        handleAuthenticatedUser(responseGoogleCallback.data);
      }
    } catch (error) {
      console.error("Error al manejar el callback de Google:", error);
    }
  };

  const handleUsernameFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        nameUser: username,
        email,
        Pais: pais,
        Ciudad: ciudad,
        biography,
        Instruments: selectedInstruments,
        Genders: selectedGenres,
      };

      const response =
        await service.Google_callback_Complete_Profile_And_Username(userData);

      handleProfileCompletionResponse(response);
    } catch (error) {
      console.error("Error al completar el perfil:", error);
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
      {showUsernameForm && (
        <div className="form-container">
          <h2>Complete su perfil:</h2>
          <form onSubmit={handleUsernameFormSubmit}>
            <label>
              Nombre de Usuario:
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <label>
              País:
              <input
                type="text"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
              />
            </label>
            <label>
              Ciudad:
              <input
                type="text"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
              />
            </label>
            <label>
              Biografía:
              <textarea
                value={biography}
                onChange={(e) => setBiography(e.target.value)}
              />
            </label>
            <label>
              Instrumentos:
              {instrumentOptions.map((instrument) => (
                <div key={instrument}>
                  <input
                    type="checkbox"
                    id={instrument}
                    name={instrument}
                    checked={selectedInstruments[instrument] === 0}
                    onChange={(e) => {
                      const checked = e.target.checked;

                      setSelectedInstruments((prev) => {
                        if (checked) {
                          return { ...prev, [instrument]: 0 };
                        } else {
                          const { [instrument]: omit, ...rest } = prev;
                          return rest;
                        }
                      });
                      console.log(selectedInstruments);
                    }}
                  />
                  <label htmlFor={instrument}>{instrument}</label>
                </div>
              ))}
            </label>
            <label>
              Géneros Musicales:
              {genreOptions.map((genre) => (
                <div key={genre}>
                  <input
                    type="checkbox"
                    id={genre}
                    name={genre}
                    checked={selectedGenres.includes(genre)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      setSelectedGenres((prev) =>
                        checked
                          ? [...prev, genre]
                          : prev.filter((item) => item !== genre)
                      );
                    }}
                  />
                  <label htmlFor={genre}>{genre}</label>
                </div>
              ))}
            </label>
            <button type="submit">Enviar</button>
          </form>
        </div>
      )}
    </div>
  );
}
