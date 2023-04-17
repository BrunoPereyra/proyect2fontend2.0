import React, { useState, useMemo, useEffect } from "react";
import { updatePost } from "../../../api/FirestoreAPI";
import ModalComponent from "../Modal";
import PostsCard from "../PostsCard";
import "./index.scss";
import service from '../../../services/service'

export default function PostStatus({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [Posts, setPost] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState("");


  const getEditData = (posts) => {
    setModalOpen(true);
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage);
    setModalOpen(false);
  };

  async function getPost() {
    const res = await service.GetPost()
    console.log(res.data.data);
    setPost(res.data.data)
  }
  useEffect(() => {
    getPost()
  }, [])

  return (
    <div className="post-status-main">
      <div className="user-details">
        <img src={currentUser.avatar} alt="imageLink" />
        <p className="name">{currentUser.NameUser}</p>
        <p className="headline">{currentUser?.headline}</p>
      </div>
      <div className="post-status">
        <img
          className="post-image"
          src={currentUser.avatar}
          alt="imageLink"
        />
        <button
          className="open-post-modal"
          onClick={() => {
            setModalOpen(true);
            setIsEdit(false);
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
        isEdit={isEdit}
        updateStatus={updateStatus}
        postImage={postImage}
        setPostImage={setPostImage}
        setCurrentPost={setCurrentPost}
        currentPost={currentPost}
      />

      <div>
        {Posts.map((posts) => {
          return (
            <div key={posts.id}>
              <PostsCard posts={posts} getEditData={getEditData} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
