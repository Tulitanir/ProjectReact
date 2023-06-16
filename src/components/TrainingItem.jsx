import React from "react";

const TrainingItem = ({
  id,
  title,
  beginning,
  end,
  date,
  capacity,
  name,
  surname,
}) => {
  return (
    <div className="news">
      <p>Программа: {title}</p>
      <p>
        Тренер: {name} {surname}
      </p>
      <p>Дата: {date}</p>
      <p>Начало: {beginning}</p>
      <p>Конец: {end}</p>
      <p>Максимальное количество участников: {capacity}</p>
    </div>
  );
};

export default TrainingItem;
