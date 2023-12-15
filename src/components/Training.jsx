function Training({ id, title, date, beginning, end }) {
  return (
    <div className="news">
      <p>Программа тренировки: {title}</p>
      <p>Дата: {date}</p>
      <p>Время начала: {beginning}</p>
      <p>Время конца: {end}</p>
    </div>
  );
}

export default Training;
