import React, { useEffect, useState } from "react";
import TrainingItem from "../components/TrainingItem";
import axios from "axios";
import Page from "./Page";

const TrainingPage = () => {
  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    fetchTrainings();
  }, []);

  const fetchTrainings = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/program/getTrainings`
      );
      setTrainings(response.data);
    } catch (error) {
      console.error("Ошибка:", error);
    }
  };

  const user = localStorage.getItem("user");
  let isReq = false;
  if (user) {
    const userRoles = JSON.parse(user).memberRoles;
    if (userRoles && userRoles.find((item) => item.name === "admin")) {
      isReq = true;
    }
  }

  return (
    <div>
      {isReq ? <Page /> : <></>}
      <h1>Групповые тренировки: </h1>
      {trainings.map((training) => (
        <TrainingItem
          key={training.id}
          id={training.id}
          name={training.name}
          surname={training.surname}
          title={training.title}
          capacity={training.capacity}
          memberCount={training.memberCount}
          date={training.date}
          beginning={training.beg}
          end={training.ending}
          getTrainings={fetchTrainings}
        />
      ))}
    </div>
  );
};

export default TrainingPage;
