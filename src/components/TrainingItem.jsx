import React from "react";
import { useNavigate } from "react-router-dom";
import Authentication from "../utils/Auth";

const TrainingItem = ({
  id,
  title,
  beginning,
  end,
  date,
  capacity,
  memberCount,
  name,
  surname,
  getTrainings,
}) => {
  const navigate = useNavigate();
  const handleSaveClick = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/loginPage");
      return;
    }

    const json = JSON.parse(user);
    const expDate = new Date(json.expirationDate);
    const trainDate = new Date(date);

    if (trainDate > expDate) {
      alert(
        "Для записи на групповую тренировку необходимо иметь абонемент в тренажёрный зал"
      );
      navigate("/subscriptions");
      return;
    }

    const body = {
      trainingId: id,
      memberId: json.id,
    };

    const request = await Authentication.fetchWithAuth(
      `http://backend:8080/api/program/signUp`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }
    );

    if (!request) {
      localStorage.clear();
      navigate("/loginPage");
    }
    try {
      const response = await fetch(request.url, request.options);
      if (response.status !== 200) {
        throw new Error(await response.text());
      }
    } catch (error) {
      alert(error);
      return;
    }

    navigate("/loginPage");
  };

  return (
    <div className="news">
      <p>Программа: {title}</p>
      <p>
        Тренер: {name} {surname}
      </p>
      <p>Дата: {date}</p>
      <p>Начало: {beginning}</p>
      <p>Конец: {end}</p>
      <p>Мест осталось: {capacity - memberCount}</p>
      <p>Всего мест: {capacity}</p>
      <button className="login-button" onClick={handleSaveClick}>
        Записаться на групповую тренировку
      </button>
    </div>
  );
};

export default TrainingItem;
