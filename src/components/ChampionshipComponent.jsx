import React, { useState, useEffect } from "react";
import PostsCard from "./common/PostsCard/index";
import service from "../services/service";

import "../Sass/ChampionshipComponent.scss";

export default function ChampionshipComponent({ currentUser }) {
  const [Championship, setChampionship] = useState({});
  const [loggedUser, setloggedUser] = useState({});
  const [AcceptedApplicants, setAcceptedApplicants] = useState("");

  async function getChampionship(token) {
    service.setToken(token);
    const res = await service.AskForChampionship({
      IDchampionship: "644a6d0441ada3ac56ff632e",
    });
    setChampionship(res.data.data);
  }
  async function applicantsChampionship() {
    service.setToken(loggedUser.token);
    const res = await service.ApplyChampionship({
      Championship_id: "644a6d0441ada3ac56ff632e",
    });
    console.log(res);
  }
  async function AcceptedApplicant() {
    service.setToken(loggedUser.token);
    const res = await service.AcceptedApplicants({
      user_id: AcceptedApplicants,
      Championship_id: "644a6d0441ada3ac56ff632e",
    });
    console.log(res);
  }
  useEffect(() => {
    const setloggedUserparse = JSON.parse(
      window.localStorage.getItem("loggedAppUser")
    );
    if (setloggedUserparse && setloggedUserparse.token) {
      setloggedUser(setloggedUserparse);
      console.log(setloggedUserparse.token);
      getChampionship(setloggedUserparse.token);
    }
  }, []);

  return (
    <div className="championship-component">
      <div className="user-details">
        <img src={currentUser.avatar} alt="imageLink" />
        <p className="name">{Championship.name}</p>
        {Championship.creator == currentUser.id ? (
          <div>
            <p className="headline">agregar participante</p>
            <input
              type="text"
              onChange={(event) => setAcceptedApplicants(event.target.value)}
            />
            <button onClick={() => AcceptedApplicant()}>a</button>
          </div>
        ) : (
          <p
            className="championship-participar"
            onClick={() => applicantsChampionship()}
          >
            aplicar al torneo
          </p>
        )}
        <div className="about-the-tournament">
          <p>premio</p>
          <p>cantidad de votos</p>
          <p>cantidad de votos</p>
        </div>
      </div>
      {console.log(Championship)}
      {/* {post.map((p) => {
        return <PostsCard posts={p} />;
      })} */}
      <div className="championship-vote-poll">
        {/* <div className="championship-vote-poll-unfolded">
          {Championship.map((p) => {
            return (
              <div className="championship-vote-poll-unfolded-user">
                <img src={p.User[0].avatar} width={70} alt="" />
                <h3>{p.User[0].nameuser}</h3>
              </div>
            );
          })}
        </div> */}
        <div>
          <span>confirmar voto</span>
          <span>^</span>
        </div>
      </div>
    </div>
  );
}
