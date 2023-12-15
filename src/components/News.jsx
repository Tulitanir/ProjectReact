import Utils from "../utils/Utils";
import { Link, useNavigate } from "react-router-dom";
import "../style/news.css";
import "../style/comment.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import Authentication from "../utils/Auth";

function News({ id, title, date, text, changed }) {
  const [isEditing, setIsEditing] = useState(false);
  const [text2, setText2] = useState(text);
  const [title2, setTitle2] = useState(title);

  const navigate = useNavigate();

  const handleBackClick = () => {
    setIsEditing(false);
  };

  const handleTextChange = (e) => {
    setTitle2(e.target.value);
  };

  const handleTextareaChange = (e) => {
    setText2(e.target.value);
  };

  const handleDeleteClick = async () => {
    const request = await Authentication.fetchWithAuth(
      `http://backend:8080/api/news/deleteNews?id=${id}`,
      {
        method: "DELETE",
      }
    );
    if (!request) {
      localStorage.clear();
      navigate("/loginPage");
    }
    try {
      await fetch(request.url, request.options);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async () => {
    const body = {
      id: id,
      title: title2,
      text: text2,
    };
    const request = await Authentication.fetchWithAuth(
      `http://backend:8080/api/news/updateNews`,
      {
        method: "PUT",
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
      const res = await fetch(request.url, request.options);
    } catch (error) {
      console.error(error);
    }
    setIsEditing(false);
  };
  let buttons = <></>;

  const user = localStorage.getItem("user");
  let roles;
  const json = JSON.parse(user);
  if (json) {
    roles = json.memberRoles;
  }
  if (roles && roles.find((item) => item.name === "admin")) {
    buttons = (
      <>
        <button onClick={handleEditClick} className="comment-edit-button">
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
        <button onClick={handleDeleteClick} className="comment-delete-button">
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </>
    );
  }

  return (
    <div className="news">
      <div className="news-header">
        <div className="news-title">
          {isEditing ? (
            <input
              type="text"
              className="edit"
              value={title2}
              onChange={handleTextChange}
            />
          ) : (
            <>{title2}</>
          )}
        </div>
      </div>
      <Link
        to={{
          pathname: "/newsInfo",
          search: `?id=${id}&title=${encodeURIComponent(
            title
          )}&date=${date}&text=${encodeURIComponent(text)}`,
        }}
      >
        <div className="news-date">
          {Utils.formatDateTime(date)} {changed ? "(Изменена)" : ""}
        </div>
      </Link>
      <div className="comment-buttons">{buttons}</div>
      <div className="news-text">
        {isEditing ? (
          <textarea
            className="edit"
            value={text2}
            onChange={handleTextareaChange}
          />
        ) : (
          <>{text2}</>
        )}
      </div>
      {isEditing ? (
        <>
          <button className="login-button" onClick={handleSaveClick}>
            Сохранить
          </button>
          <br />
          <br />
          <button className="login-button" onClick={handleBackClick}>
            Отмена
          </button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}

export default News;
