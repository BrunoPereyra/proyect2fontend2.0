import React, { useState, useMemo, useEffect } from "react";
import ModalComponent from "../Modal";
import PostsCard from "../PostsCard";
import "./index.scss";
import service from "../../../services/service";

export default function PostStatus() {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [Posts, setPost] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [postImage, setPostImage] = useState("");

  async function getPost() {
    let loggedUser = window.localStorage.getItem("loggedAppUser");
    if (loggedUser) {
      service.setToken(loggedUser);
    } else {
      navigate("/login");
    }
    const res = await service.PostGetFollow();
    console.log(res.data.message);
    setPost(res.data.message);
  }
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="post-status-main">
      <div className="user-details">
        <img
          src="https://img.freepik.com/vector-premium/linda-imagen-vectorial-dibujos-animados-estrellas-brillantes-amarillas_423491-67.jpg?w=740"
          alt="imageLink"
        />
        <p className="name">NombreDeUsuario</p>
        <p className="headline">headline</p>
      </div>
      <div className="post-status">
        <img
          className="post-image"
          src="https://img.freepik.com/vector-premium/linda-imagen-vectorial-dibujos-animados-estrellas-brillantes-amarillas_423491-67.jpg?w=740"
          alt="imageLink"
        />
        <button
          className="open-post-modal"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          Start a Post
        </button>
      </div>

      <ModalComponent
        setStatus={setStatus}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        status={status}
        postImage={postImage}
        setPostImage={setPostImage}
        setCurrentPost={setCurrentPost}
        currentPost={currentPost}
      />

      <div>
        {Posts ? (
          <div>
            {Posts.map((posts) => {
              return (
                <div key={posts._id}>
                  <PostsCard posts={posts} />
                </div>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
