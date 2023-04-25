import React from "react";
import PostsCard from "./common/PostsCard/index";

import "../Sass/ChampionshipComponent.scss";

export default function ChampionshipComponent({ currentUser }) {
  const post = [
    {
      Likes: ["644540201ed524f31d5a45c7"],
      User: [
        {
          _id: "644540201ed524f31d5a45c7",
          avatar:
            "https://res.cloudinary.com/depcty8j1/image/upload/v1682260000/lu4jc3bpehdn8bbgnvgm.jpg",
          email: "bruaaaao@0023.com",
          nameuser: "bruno",
        },
      ],
      _id: "64454f1bfea17efff9c04a530",
      postimage: "",
      status: "<p>sasas</p>",
      timestamp: "2023-04-23T12:30:35.267-03:00",
    },
    {
      Likes: ["644540201ed524f31d5a45c7"],
      User: [
        {
          _id: "644540201ed524f31d5a45c7",
          avatar:
            "https://res.cloudinary.com/depcty8j1/image/upload/v1682260000/lu4jc3bpehdn8bbgnvgm.jpg",
          email: "bruaaaao@0023.com",
          nameuser: "bruno",
        },
      ],
      _id: "64454f1bfae1a7efff9c04a530",
      postimage: "",
      status: "<p>sasas</p>",
      timestamp: "2023-04-23T12:30:35.267-03:00",
    },
    {
      Likes: ["644540201ed524f31d5a45c7"],
      User: [
        {
          _id: "644540201ed524f31d5a45c7",
          avatar:
            "https://res.cloudinary.com/depcty8j1/image/upload/v1682260000/lu4jc3bpehdn8bbgnvgm.jpg",
          email: "bruaaaao@0023.com",
          nameuser: "bruno",
        },
      ],
      _id: "64454f1bfaeaa17efff9c04a530",
      postimage: "",
      status: "<p>sasas</p>",
      timestamp: "2023-04-23T12:30:35.267-03:00",
    },
    {
      Likes: ["644540201eds524f31d5a45c7"],
      User: [
        {
          _id: "644540201ed524f31d5a45c7",
          avatar:
            "https://res.cloudinary.com/depcty8j1/image/upload/v1682260000/lu4jc3bpehdn8bbgnvgm.jpg",
          email: "bruaaaao@0023.com",
          nameuser: "bruno",
        },
      ],
      _id: "64454f1bfaesaa17efff9c04a530",
      postimage: "",
      status: "<p>sasas</p>",
      timestamp: "2023-04-23T12:30:35.267-03:00",
    },
    {
      Likes: ["64454s0201ed524f31d5a45c7"],
      User: [
        {
          _id: "6445402s01ed524f31d5a45c7",
          avatar:
            "https://res.cloudinary.com/depcty8j1/image/upload/v1682260000/lu4jc3bpehdn8bbgnvgm.jpg",
          email: "bruaaaao@0023.com",
          nameuser: "bruno",
        },
      ],
      _id: "64454f1bsfaeaa17efff9c04a530",
      postimage: "",
      status: "<p>sasas</p>",
      timestamp: "2023-04-23T12:30:35.267-03:00",
    },
    {
      Likes: ["64454s0201ed524f31d5a45c7"],
      User: [
        {
          _id: "6445402s01ed524f31d5a45c7",
          avatar:
            "https://res.cloudinary.com/depcty8j1/image/upload/v1682260000/lu4jc3bpehdn8bbgnvgm.jpg",
          email: "bruaaaao@0023.com",
          nameuser: "bruno",
        },
      ],
      _id: "64454f1bsfaeaa17efff9c04a530",
      postimage: "",
      status: "<p>sasas</p>",
      timestamp: "2023-04-23T12:30:35.267-03:00",
    },
  ];
  return (
    <div className="championship-component">
      <div className="user-details">
        <img src={currentUser.avatar} alt="imageLink" />
        <p className="name">{currentUser.NameUser}</p>
        <p className="headline">{currentUser?.headline}</p>
        <div className="about-the-tournament">
          <p>premio</p>
          <p>cantidad de votos</p>
          <p>cantidad de votos</p>
        </div>
      </div>
      {post.map((p) => {
        return <PostsCard posts={p} />;
      })}
      <div className="championship-vote-poll">
        <div className="championship-vote-poll-unfolded">
          {post.map((p) => {
            return (
              <div className="championship-vote-poll-unfolded-user">
                <img src={p.User[0].avatar} width={70} alt="" />
                <h3>{p.User[0].nameuser}</h3>
              </div>
            );
          })}
        </div>
        <div>
          <span>confirmar voto</span>
          <span>^</span>
        </div>
      </div>
    </div>
  );
}
