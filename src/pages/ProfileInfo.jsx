import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageComponent from "../components/ImageComponent";
import "../style/profile.css";

const ProfileInfo = () => {
  const location = useLocation();
  const user = JSON.parse(location.state?.user);
  const navigate = useNavigate();
  if (!user) {
    navigate("/loginPage");
  }
  let userRoles = "";
  user.memberRoles.forEach((role) => {
    userRoles += role.name + ", ";
  });
  userRoles = userRoles.substring(0, userRoles.length - 2);

  const logoutHandle = () => {
    localStorage.clear();
    navigate("/loginPage");
  };

  return (
    <div className="profile-page">
      <h1>Добро пожаловать в профиль</h1>
      <div className="avatar">
        <ImageComponent id={user.id} />
      </div>
      <div className="user-details">
        <h2>{`${user.name} ${user.surname}`} </h2>
        <p>Телефон: {user.phone} </p>
        <p>Email: {user.email} </p>
        <p>Роли: {userRoles} </p>
      </div>
      <br />
      <br />
      <button className="profile-button">Изменить данные аккаунта</button>
      <br />
      <br />
      <button className="profile-button" onClick={logoutHandle}>
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default ProfileInfo;
