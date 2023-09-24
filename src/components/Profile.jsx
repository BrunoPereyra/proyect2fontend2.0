import React, { useEffect, useState } from "react";
import service from "../services/service";

export default function Profile({ user, currentUserId }) {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.Followers.includes(currentUserId)) {
        setIsFollowing(true);
      } else {
        setIsFollowing(false);
      }
    }
  }, [user]);

  const handleFollowClick = async () => {
    if (!isFollowing) {
      await service.follow({ IdUser: user.id });
      user.Followers.push(currentUserId);
      setIsFollowing(true);
    } else {
      await service.Unfollow({ IdUser: user.id });
      const updatedFollowers = user.Followers.filter(
        (followerId) => followerId !== currentUserId
      );
      user.Followers = updatedFollowers;
      setIsFollowing(false);
    }
  };

  const handleSendMessageClick = () => {
    // Implementa la lógica para enviar un mensaje al usuario aquí
  };

  if (!user) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div>
      <div className="profile-header">
        <img
          src={user.Avatar}
          alt={`${user.NameUser}'s Profile`}
          className="profile-pic"
        />
        <div className="profile-info">
          <div className="user-actions">
            <h1>{user.NameUser}</h1>
            <button
              onClick={handleFollowClick}
              className={isFollowing ? "unfollow-button" : "follow-button"}
            >
              {isFollowing ? "Dejar de seguir" : "Seguir"}
            </button>
            <button onClick={handleSendMessageClick} className="message-button">
              Enviar mensaje
            </button>
          </div>
          <div className="user-stats">
            <p>
              <span>Seguidores: {user.Followers.length}</span>
            </p>
            <p>
              <span>Publicaciones: {user.Likes.length}</span>
            </p>
            <p>
              <span>Siguiendo: {user.Following.length}</span>
            </p>
          </div>
          <p className="bio">{user.biography}</p>
        </div>
      </div>
    </div>
  );
}
