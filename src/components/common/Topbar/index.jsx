import React, { useEffect, useState } from "react";
import LinkedinLogo from "../../../assets/linkedinLogo.png";
import SearchUsers from "../SearchUsers";
import {
  AiOutlineHome,
  AiOutlineUserSwitch,
  AiOutlineSearch,
  AiOutlineMessage,
  AiOutlineBell,
} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { BsBriefcase } from "react-icons/bs";
import ProfilePopup from "../ProfilePopup";
import "./index.scss";
import service from '../../../services/service'

export default function Topbar({ currentUser }) {
  const [popupVisible, setPopupVisible] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [users, setUsers] = useState([]);
  const [UsersSearchTopbar, setUsersSearchTopbar] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  let navigate = useNavigate();

  const goToRoute = (route) => {
    navigate(route);
  };

  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  const openUser = (user) => {
    navigate("/profile", {
      state: {
        id: user._id,
        email: user.email,
      },
    });
  };

  const handleSearch = async () => {
    if (searchInput !== "") {
      let searched = await service.searchuser(searchInput)
      setUsersSearchTopbar(searched.data.data);
    } else {
      console.log("handleSearch cae el else");
    }
  };

  useEffect(() => {
    let debounced = setTimeout(() => {
      handleSearch();
    }, 1000);

    return () => clearTimeout(debounced);
  }, [searchInput]);


  return (
    <div className="topbar-main">
      {popupVisible ? (
        <div className="popup-position">
          <ProfilePopup />
        </div>
      ) : (
        <></>
      )}

      <img className="linkedin-logo" src={LinkedinLogo} alt="LinkedinLogo" />
      {isSearch ? (
        <SearchUsers
          setIsSearch={setIsSearch}
          setSearchInput={setSearchInput}
        />
      ) : (
        <div className="react-icons">
          <AiOutlineSearch
            size={30}
            className="react-icon"
            onClick={() => setIsSearch(true)}
          />
          <AiOutlineHome
            size={30}
            className="react-icon"
            onClick={() => goToRoute("/home")}
          />
          <AiOutlineUserSwitch
            size={30}
            className="react-icon"
            onClick={() => goToRoute("/connections")}
          />
          <BsBriefcase size={30} className="react-icon" />
          <AiOutlineMessage size={30} className="react-icon" />
          <AiOutlineBell size={30} className="react-icon" />
        </div>
      )}
      <img
        className="user-logo"
        src={currentUser.avatar}
        alt="user"
        onClick={displayPopup}
      />

      {searchInput.length === 0 ? (
        <></>
      ) : (
        <div className="search-results">
          {UsersSearchTopbar.length === 0 ? (
            <div className="search-inner">No Results Found..</div>
          ) : (
            UsersSearchTopbar.map((user) => (
              <div className="search-inner" onClick={() => openUser(user)}>
                <img src={user.avatar} />
                <p className="name">{user.NameUser}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
