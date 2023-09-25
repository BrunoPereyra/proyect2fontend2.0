import React, { useEffect, useState } from "react";
import Topbar from "../components/common/Topbar";
import Profile from "../components/Profile";
import service from "../services/service";
import "../Sass/match.scss"; // Asegúrate de que la ruta del archivo SCSS sea correcta

export default function Match() {
  const [currentUser, setCurrentUser] = useState({});
  const [userList, setUserList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Estados para almacenar los filtros seleccionados por el usuario
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSex, setSelectedSex] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBirthDate, setSelectedBirthDate] = useState("");
  const [selectedSituation, setSelectedSituation] = useState("");
  const [selectedInstruments, setSelectedInstruments] = useState({
    piano: 0,
    guitarra: 0,
  });
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedExperience, setSelectedExperience] = useState(0);
  const [selectedZodiacSign, setSelectedZodiacSign] = useState("");

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
      Instruments: instruments,
      Genders: selectedGenders,
      Experience: selectedExperience,
      ZodiacSign: selectedZodiacSign,
      PageSize: 10,
    };

    const filteredUsers = await service.MatchUser(filters);
    setUserList(filteredUsers.data.data);
    setCurrentIndex(0);
  };

  const showNextProfile = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % userList.length);
  };

  useEffect(() => {
    funcsetCurrentUser();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [
    selectedCountry,
    selectedCity,
    selectedSex,
    selectedBirthDate,
    selectedSituation,
    selectedInstruments,
    selectedGenders,
    selectedExperience,
    selectedZodiacSign,
  ]); // Agregar las dependencias de los efectos

  // Función para mostrar la ventana emergente de filtros
  const openFilters = () => {
    console.log("isiai");
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
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="select-box"
            >
              <option value="">Cualquier País</option>
              <option value="ARG">Argentina</option>
              {/* Agregar más opciones si es necesario */}
            </select>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="select-box"
            >
              <option value="">Cualquier Ciudad</option>
              <option value="CBA">Córdoba</option>
              {/* Agregar más opciones si es necesario */}
            </select>
            <select
              value={selectedSex}
              onChange={(e) => setSelectedSex(e.target.value)}
              className="select-box"
            >
              <option value="">Cualquier Sexo</option>
              <option value="mujer">Mujer</option>
              <option value="hombre">Hombre</option>
              {/* Agregar más opciones si es necesario */}
            </select>
            <select
              value={selectedSituation}
              onChange={(e) => setSelectedSituation(e.target.value)}
              className="select-box"
            >
              <option value="">Cualquier Situación</option>
              <option value="Soltero">Soltero</option>
              <option value="Casado">Casado</option>
              {/* Agregar más opciones si es necesario */}
            </select>

            <select
              multiple
              value={selectedGenders}
              onChange={(e) =>
                setSelectedGenders(
                  [...e.target.selectedOptions].map((option) => option.value)
                )
              }
              className="select-box"
            >
              <option value="">Cualquier Género</option>
              <option value="ROCK">Rock</option>
              <option value="POP">Pop</option>
              <option value="HIPHOP">Hip Hop</option>
              {/* Agregar más opciones si es necesario */}
            </select>

            <label>Instrumentos:</label>
            <div>
              <label>
                Piano:
                <input
                  type="number"
                  min="0"
                  value={selectedInstruments.piano}
                  onChange={(e) =>
                    setSelectedInstruments({
                      ...selectedInstruments,
                      piano: parseInt(e.target.value),
                    })
                  }
                />
              </label>
            </div>
            <div>
              <label>
                Guitarra:
                <input
                  type="number"
                  min="0"
                  value={selectedInstruments.guitarra}
                  onChange={(e) =>
                    setSelectedInstruments({
                      ...selectedInstruments,
                      guitarra: parseInt(e.target.value),
                    })
                  }
                />
              </label>
            </div>

            {/* Agregar aquí el código JSX para los otros filtros, como Experiencia, ZodiacSign, etc. */}

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
