import React from "react";
import { useLocation } from "react-router-dom";
import ImageComponent from "../components/ImageComponent";

const ProfileInfo = () => {
  const location = useLocation();
  const user = JSON.parse(location.state?.user);

  return (
    <div className="profile-page">
      <h1>Добро пожаловать в профиль</h1>
      <div className="avatar">
        <ImageComponent id={user.id} />
      </div>
      <div className="user-details">
        <h2>{`${user.name} ${user.surname}`}</h2>
        <p>Телефон: {user.phone}</p>
        <p>Email: {user.email}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
