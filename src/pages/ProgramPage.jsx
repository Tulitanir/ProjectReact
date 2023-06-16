import React, { useEffect, useState } from "react";
import Program from "../components/Program";
import Utils from "../utils/Utils";
import Authentication from "../utils/Auth";
import { Navigate } from "react-router-dom";

const ProgramPage = () => {
  const [data, setData] = useState([]);
  const [programName, setProgramName] = useState("");
  const [programDescription, setProgramDescription] = useState("");

  const handleProgramNameChange = (event) => {
    setProgramName(event.target.value);
  };

  const handleProgramDescriptionChange = (event) => {
    setProgramDescription(event.target.value);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch("http://localhost:8080/api/program/getAll")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error(error));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const programData = {
      name: programName,
      description: programDescription,
    };

    const request = await Authentication.fetchWithAuth(
      "http://localhost:8080/api/program/addProgram",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(programData),
      }
    );
    if (!request) {
      Navigate("/login");
      return;
    }
    fetch(request.url, request.options)
      .then((response) => {
        if (response.ok) {
          setProgramName("");
          setProgramDescription("");
          let newData = data.concat(programData);
          setData(newData);
        } else {
          throw new Error("Ошибка при отправке данных");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  let addForm = (
    <>
      <h2>Добавление программы тренировок:</h2>
      <form onSubmit={handleSubmit}>
        <h3>Название программы</h3>
        <input
          type="text"
          value={programName}
          onChange={handleProgramNameChange}
        />
        <h3>Описание программы</h3>
        <textarea
          value={programDescription}
          onChange={handleProgramDescriptionChange}
          placeholder="Введите ваш комментарий..."
          required
        ></textarea>
        <button className="login-button" type="submit">
          Отправить
        </button>
      </form>
    </>
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

  return (
    <div className="program-page">
      <h1 className="program-page-title">Программы тренировок</h1>
      {addForm}
      <div className="program-list">
        {data.map((item) => (
          <Program
            key={item.id}
            id={item.id}
            title={item.name}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default ProgramPage;
