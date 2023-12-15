import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageComponent from "../components/ImageComponent";
import "../style/profile.css";
import TrainersTraining from "../components/TrainersTrainings";
import Utils from "../utils/Utils";
import Authentication from "../utils/Auth";
import MemberTraining from "../components/MemberTrainings";

const ProfileInfo = () => {
  const [crutch, setCrutch] = useState(false);
  useEffect(() => {
    async function fetchDate() {
      try {
        await Authentication.fetchWithAuth(null, { headers: {} }, true);
        setCrutch(true);
      } catch (error) {
        console.error(error);
      }
    }
    fetchDate();
  }, []);

  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  if (!user) {
    navigate("/loginPage");
  }
  let userRoles = "";
  user.memberRoles.forEach((role) => {
    userRoles += role.name + ", ";
  });
  userRoles = userRoles.substring(0, userRoles.length - 2);

  const roles = user.memberRoles;
  let component = <></>;
  let component2 = (
    <>
      {" "}
      <h2>Ваши групповые тренировки: </h2>{" "}
      <MemberTraining key={user.id} id={user.id} />
    </>
  );
  if (roles.find((item) => item.name === "trainer")) {
    component = (
      <>
        {" "}
        <h2>Ближайшие групповые тренировки: </h2>{" "}
        <TrainersTraining key={user.id} id={user.id} />
      </>
    );
  }

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
        <p>
          Срок действия абонемента:{" "}
          {user.expirationDate === null
            ? "Абонемент не приобретён"
            : Utils.formatDateTime(user.expirationDate).substring(
                0,
                Utils.formatDateTime(user.expirationDate).length - 10
              )}
        </p>
      </div>
      {/* <br />
      <br />
      <button className="profile-button">Изменить данные аккаунта</button> */}
      <br />
      <br />
      {component2}
      <>{component}</>
      <button className="profile-button" onClick={logoutHandle}>
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default ProfileInfo;
