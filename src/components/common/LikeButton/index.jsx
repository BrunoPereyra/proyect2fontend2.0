import React, { useEffect, useState } from "react";
import "./index.scss";
import { AiOutlineHeart, AiFillHeart, AiOutlineComment } from "react-icons/ai";
import { BsFillHandThumbsUpFill, BsHandThumbsUp } from "react-icons/bs";
import service from "../../../services/service";

export default function LikeButton({ postId, currentUser, Likes }) {
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [liked, setLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const handleLike = async () => {
    let loggedUser = window.localStorage.getItem("loggedAppUser");
    service.setToken(loggedUser);
    if (liked) {
      setLiked(false);
      await service.DislikePost({ idPost: postId });
    } else {
      setLiked(true);
      await service.LikePost({ idPost: postId });
    }
  };
  const getComment = (event) => {
    setComment(event.target.value);
  };

  const addComment = async () => {
    let loggedUser = window.localStorage.getItem("loggedAppUser");
    service.setToken(loggedUser);
    await service.CommentPost({ status: comment, OriginalPost: postId });
    setComment("");
  };

  const checkifalreadyliked = () => {
    if (Likes.length !== 0) {
      Likes.forEach((like) => {
        if (like === currentUser.id) {
          setLiked(true);
        }
      });
    } else {
      setLiked(false);
    }
  };
  useEffect(() => {
    checkifalreadyliked();
    // getComments(postId, setComments);
  }, [currentUser]);
  return (
    <div className="like-container">
      <p>{Likes.length} People Like this Post</p>
      <div className="hr-line">
        <hr />
      </div>
      <div className="like-comment">
        <div className="likes-comment-inner" onClick={handleLike}>
          {liked ? (
            <BsFillHandThumbsUpFill size={30} color="#0a66c2" />
          ) : (
            <BsHandThumbsUp size={30} />
          )}

          <p className={liked ? "blue" : "black"}>Like</p>
        </div>
        <div
          className="likes-comment-inner"
          onClick={() => setShowCommentBox(!showCommentBox)}
        >
          {
            <AiOutlineComment
              size={30}
              color={showCommentBox ? "#0a66c2" : "#212121"}
            />
          }

          <p className={showCommentBox ? "blue" : "black"}>Comments</p>
        </div>
      </div>
      {showCommentBox ? (
        <>
          <input
            onChange={getComment}
            placeholder="Add a Comment"
            className="comment-input"
            name="comment"
            value={comment}
          />
          <button className="add-comment-btn" onClick={addComment}>
            Add Comment
          </button>

          {comments.length > 0 ? (
            comments.map((comment) => {
              return (
                <div className="all-comments">
                  <p className="name">{comment.name}</p>
                  <p className="comment">{comment.comment}</p>

                  <p className="timestamp">{comment.timeStamp}</p>

                  <p>•</p>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
