import React, { useState, useMemo, useEffect } from "react";
import ModalComponent from "../Modal";
import PostsCard from "../PostsCard";
import "./index.scss";
import service from "../../../services/service";

export default function PostStatus({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [Posts, setPost] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [postImage, setPostImage] = useState("");

  async function getPost() {
    const res = await service.GetPost();
    setPost(res.data.data);
  }
  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="post-status-main">
      <div className="user-details">
        <img src={currentUser.avatar} alt="imageLink" />
        <p className="name">{currentUser.NameUser}</p>
        <p className="headline">{currentUser?.headline}</p>
      </div>
      <div className="post-status">
        <img className="post-image" src={currentUser.avatar} alt="imageLink" />
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
