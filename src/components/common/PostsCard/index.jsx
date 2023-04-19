import React, {useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "antd";
import { BsPencil, BsTrash } from "react-icons/bs";
import {
  deletePost,
} from "../../../api/FirestoreAPI";
import LikeButton from "../LikeButton";
import "./index.scss";

export default function PostsCard({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [imageModal, setImageModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  async function funcsetCurrentUser() {
    let loggedUser = window.localStorage.getItem("loggedAppUser");
    if (loggedUser) {
      const userStorage = JSON.parse(loggedUser);
      setCurrentUser(userStorage)
    } else {
      navigate("/login");
    }
  }
  useEffect(() => {
    funcsetCurrentUser()
  }, []);

  return posts.User[0]._id ? (
    <div className="posts-card" key={id}>
      <div className="post-image-wrapper">
        {/* {currentUser.id === posts.User[0]._id ? (
          <div className="action-container">
            <BsPencil
              size={20}
              className="action-icon"
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className="action-icon"
              onClick={() => deletePost(posts.id)}
            />
          </div>
        ) : (
          <></>
        )} */}

        <img
          alt="profile-image"
          className="profile-image"
          src={posts.User[0].avatar }
        />
        <div>
          <p
            className="name"
            onClick={() =>
              navigate("/profile", {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }
          >
            {posts.User[0].nameuser}
          </p>
          <p className="headline">
          {posts.User[0].nameuser}
          </p>
          <p className="timestamp">{posts.timestamp}</p>
        </div>
      </div>
      {posts.postimage ? (
        <img
          onClick={() => setImageModal(true)}
          src={posts.postimage}
          className="post-image"
          alt="post-image"
        />
      ) : (
        <></>
      )}
      <p
        className="status"
        dangerouslySetInnerHTML={{ __html: posts.status }}
      ></p>

      <LikeButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      />

      {/* <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      > */}
        {/* <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className="post-image modal"
          alt="post-image"
        /> */}
      {/* </Modal> */}
    </div>
  ) : (
    <></>
  );
}
