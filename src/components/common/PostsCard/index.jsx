import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import LikeButton from "../LikeButton";
import "./index.scss";

export default function PostsCard({ posts, id }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [imageModal, setImageModal] = useState(false);

  async function funcsetCurrentUser() {
    let loggedUser = window.localStorage.getItem("loggedAppUser");
    if (loggedUser) {
    } else {
      navigate("/login");
    }
  }
  useEffect(() => {
    funcsetCurrentUser();
  }, []);

  return posts?._id ? (
    <div className="posts-card" key={posts?._id}>
      <div className="post-image-wrapper">
        <img
          alt="profile-image"
          className="profile-image"
          src={posts.UserInfo.Avatar}
        />
        <div>
          <p
            className="name"
            onClick={() =>
              navigate("/profile", {
                state: { id: posts.UserInfo.NameUser, email: posts.userEmail },
              })
            }
          >
            {posts.UserInfo.NameUser}
          </p>
          <p className="headline">{posts.UserInfo.NameUser}</p>
          <p className="timestamp">{posts.TimeStamp}</p>
        </div>
      </div>
      {posts.PostImage != "" ? (
        <img
          onClick={() => setImageModal(true)}
          src={posts.PostImage}
          className="post-image"
          alt="post-image"
        />
      ) : (
        <></>
      )}
      <p
        className="status"
        dangerouslySetInnerHTML={{ __html: posts.Status }}
      ></p>

      <LikeButton
        postId={posts._id}
        currentUser={currentUser}
        Likes={posts.Likes ? posts.Likes : (posts.Likes = [])}
      />
      <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          onClick={() => setImageModal(true)}
          src={posts.postimage}
          className="post-image modal"
          alt="post-image"
        />
      </Modal>
    </div>
  ) : (
    <></>
  );
}
