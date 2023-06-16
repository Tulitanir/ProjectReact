import React, { useState, useEffect } from "react";
import Authentication from "../utils/Auth";

const Page = () => {
  const [option1, setOption1] = useState([]);
  const [option2, setOption2] = useState([]);
  const [selectedValue1, setSelectedValue1] = useState([]);
  const [selectedValue2, setSelectedValue2] = useState([]);
  const [date, setDate] = useState(null);
  const [time1, setTime1] = useState(null);
  const [time2, setTime2] = useState(null);
  const [capacity, setcapacity] = useState(0);

  useEffect(() => {
    fetch("http://localhost:8080/api/program/getAll")
      .then((response) => response.json())
      .then((data) => setOption1(data))
      .catch((error) => console.error(error));

    let trainersRequest;
    let response;
    Authentication.fetchWithAuth(
      "http://localhost:8080/api/member/find?role=trainer",
      {
        method: "GET",
      }
    ).then((response) => {
      trainersRequest = response;
      response = fetch(trainersRequest.url, trainersRequest.options)
        .then((response) => response.json())
        .then((data) => setOption2(data))
        .catch((error) => console.error(error));
    }, []);
    console.log(option1, option2);
  }, []);

  const handleOption1Change = (event) => {
    setSelectedValue1(event.target.value);
  };

  const handleOption2Change = (event) => {
    setSelectedValue2(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTime1Change = (event) => {
    setTime1(event.target.value);
  };

  const handleTime2Change = (event) => {
    setTime2(event.target.value);
  };

  const handlecapacityChange = (event) => {
    setcapacity(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = {
      program: selectedValue1,
      trainer: selectedValue2,
      date: date,
      beg: time1,
      ending: time2,
      capacity: capacity,
    };

    const request = await Authentication.fetchWithAuth(
      `http://localhost:8080/api/program/addTraining`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(res),
      }
    );

    try {
      const response = await fetch(request.url, request.options);
      if (response.status == 400) {
        let text = await response.text();
        throw new Error(text);
      } else {
        let training = await response.json();
        // let trainings =
      }
    } catch (error) {
      alert(error);
    }

    setSelectedValue1("");
    setSelectedValue2("");
  };

  let addForm = (
    <div>
      <h2>Добавить групповое занятие</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="option1">Выберите программу тренировки:</label>
          <select
            id="option1"
            value={selectedValue1}
            onChange={handleOption1Change}
          >
            <option value="">-- Выберите --</option>
            {option1.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="option2">Выберите тренера:</label>
          <select
            id="option2"
            value={selectedValue2}
            onChange={handleOption2Change}
          >
            <option value="">-- Выберите --</option>
            {option2.map((option) => (
              <option key={option.id} value={option.id}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <br />
        <div>
          <label htmlFor="date">Выберите дату:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="time1">Выберите время 1:</label>
          <input
            type="time"
            id="time1"
            value={time1}
            onChange={handleTime1Change}
          />
        </div>
        <br />
        <div>
          <label htmlFor="time2">Выберите время 2:</label>
          <input
            type="time"
            id="time2"
            value={time2}
            onChange={handleTime2Change}
          />
        </div>
        <br />
        <div>
          <label htmlFor="capacity">
            Укажите максимальное количество участников:
          </label>
          <input
            type="number"
            min={0}
            max={100}
            id="capacity"
            value={capacity}
            onChange={handlecapacityChange}
          />
        </div>
        <br />
        <button className="login-button" type="submit">
          Отправить
        </button>
      </form>
    </div>
  );

  const user = localStorage.getItem("user");
  if (user) {
    const userRoles = JSON.parse(user).memberRoles;
    if (userRoles && !userRoles.find((item) => item.name === "admin")) {
      addForm = <></>;
    } else if (!userRoles) {
      addForm = <></>;
    }
  } else {
    addForm = <></>;
  }

  return <>{addForm}</>;
};

export default Page;
