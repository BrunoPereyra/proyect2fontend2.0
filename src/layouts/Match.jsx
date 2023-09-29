import React, { useEffect, useState } from "react";
import Topbar from "../components/common/Topbar";
import Profile from "../components/Profile";
import service from "../services/service";
import "../Sass/match.scss";

export default function Match() {
  const [currentUser, setCurrentUser] = useState({});
  const [userList, setUserList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);

  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSex, setSelectedSex] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBirthDate, setSelectedBirthDate] = useState("");
  const [selectedSituation, setSelectedSituation] = useState("");

  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(0);
  const [selectedZodiacSign, setSelectedZodiacSign] = useState("");

  const [selectedInstruments, setSelectedInstruments] = useState({});
  const instrumentOptions = ["Guitarra", "Piano", "Batería", "Bajo", "Otro"];
  const [selectedGenres, setSelectedGenres] = useState([]);
  const genreOptions = ["Rock", "Trap", "Rap", "Pop", "Electrónica", "Otros"];
  async function funcsetCurrentUser() {
    let loggedUser = window.localStorage.getItem("loggedAppUser");
    let id = window.localStorage.getItem("_id");

    if (loggedUser) {
      service.setToken(loggedUser);
      setCurrentUserId(id);
    } else {
      // Agrega la lógica de navegación adecuada aquí
      // Por ejemplo: history.push("/login") si estás utilizando React Router
    }
  }

  const applyFilters = async () => {
    const instruments = {};

    if (selectedInstruments.piano > 0) {
      instruments.piano = selectedInstruments.piano;
    }

    if (selectedInstruments.guitarra > 0) {
      instruments.guitarra = selectedInstruments.guitarra;
    }

    const filters = {
      Pais: selectedCountry,
      Ciudad: selectedCity,
      sex: selectedSex,
      birthDate: selectedBirthDate,
      situation: selectedSituation,
      Instruments: selectedInstruments,
      Genders: selectedGenres,
      Experience: selectedExperience,
      ZodiacSign: selectedZodiacSign,
      PageSize: 10,
    };

    try {
      const filteredUsers = await service.MatchUser(filters);

      if (!filteredUsers.data.data) {
        setUserList([]);
        setCurrentIndex(0);
      } else {
        setUserList(filteredUsers.data.data);
        setCurrentIndex(0);
      }
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
    }
  };

  const showNextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % userList.length);
  };

  useEffect(() => {
    funcsetCurrentUser();
    applyFilters(); // Cargar usuarios con valores por defecto al entrar a la página
  }, []);

  // Función para mostrar la ventana emergente de filtros
  const openFilters = () => {
    setShowFilters(true);
  };

  // Función para ocultar la ventana emergente de filtros
  const closeFilters = () => {
    setShowFilters(false);
  };

  return (
    <div>
      <Topbar currentUser={currentUser} />

      <button onClick={openFilters} className="filter-button">
        Filtros
      </button>

      {showFilters && (
        <div className="filter-popup">
          <form>
            {/* Resto del código... */}
            <div>
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
            </div>

            <button
              type="button"
              onClick={applyFilters}
              className="apply-button"
            >
              Aplicar Filtros
            </button>
            <button
              type="button"
              onClick={closeFilters}
              className="close-button"
            >
              Cerrar
            </button>
          </form>
        </div>
      )}

      {userList.length === 0 ? (
        <div className="no-users-message">
          No hay usuarios que cumplan con los filtros seleccionados.
        </div>
      ) : (
        <div className="user-profile">
          <Profile
            user={userList[currentIndex]}
            currentUserId={currentUserId}
          />
          <button onClick={showNextProfile} className="next-button">
            Siguiente Perfil
          </button>
        </div>
      )}
    </div>
  );
}
