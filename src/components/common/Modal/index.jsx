import React from "react";
import { Button, Modal } from "antd";
import { AiOutlinePicture } from "react-icons/ai";
import ReactQuill from "react-quill";
import "./index.scss";
import service from '../../../services/service';



const ModalComponent = ({
  modalOpen,
  setModalOpen,
  setStatus,
  status,
  setPostImage,
  postImage,
  currentPost,
  setCurrentPost,
}) => {
  async function Postupload() {
    console.log(status, postImage);
    const formData = new FormData();

    formData.append("Status", status);
    formData.append("PostImage", postImage);
    try {
      let loggedUser = window.localStorage.getItem("loggedAppUser");
      if (loggedUser) {
        const userStorage = JSON.parse(loggedUser);
        service.setToken(userStorage.token);
        await service.Postupload(formData)
        setModalOpen(false)
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Modal
        title="Create a post"
        centered
        open={modalOpen}
        onOk={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setCurrentPost({});
        }}
        onCancel={() => {
          setStatus("");
          setModalOpen(false);
          setPostImage("");
          setCurrentPost({});
        }}
        footer={[
          <Button
            onClick={Postupload}
            key="submit"
            type="primary"
            disabled={status.length > 0 ? false : true}
          >
            {"Post"}
          </Button>,
        ]}
      >
        <div className="posts-body">
          <ReactQuill
            className="modal-input"
            theme="snow"
            value={status}
            placeholder="Share Something Useful.."
            onChange={setStatus}
          />
          {postImage?.length > 0 || currentPost?.postImage?.length ? (
            <img
              className="preview-image"
              src={postImage || currentPost?.postImage}
              alt="postImage"
            />
          ) : (
            <></>
          )}
        </div>
        <label for="pic-upload">
          <AiOutlinePicture size={35} className="picture-icon" />
        </label>
        <input
          id="pic-upload"
          type={"file"}
          hidden
          onChange={(event) => setPostImage(event.target.files[0])}
        />
      </Modal>
    </>
  );
};

export default ModalComponent;
