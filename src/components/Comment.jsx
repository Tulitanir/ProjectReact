import React from "react";
import Utils from "../utils/Utils";
import "../style/comment.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Authentication from "../utils/Auth";

const Comment = ({
  id,
  memberId,
  newsId,
  name,
  surname,
  text,
  time,
  changed,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text2, setText] = useState(text);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  let userId;
  let userRoles;
  if (user) {
    userId = user.id;
    userRoles = user.memberRoles;
  }

  const handleTextareaChange = (e) => {
    setText(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleBackClick = () => {
    setIsEditing(false);
  };

  const handleDeleteClick = async () => {
    const request = await Authentication.fetchWithAuth(
      `http://backend:8080/api/news/deleteComment?id=${id}`,
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

  const handleSaveClick = async () => {
    const body = {
      id: id,
      text: text2,
    };
    const request = await Authentication.fetchWithAuth(
      `http://backend:8080/api/news/updateComment`,
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
    await fetch(request.url, request.options);
    setIsEditing(false);
  };

  let componentToRender = <></>;

  if (memberId && userId) {
    if (userRoles.find((item) => item.name === "admin")) {
      componentToRender = (
        <>
          <button onClick={handleDeleteClick} className="comment-delete-button">
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </>
      );
    }
    if (userId === memberId) {
      componentToRender = (
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
  }

  return (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-author">{`${name} ${surname}`}</div>
        <div className="comment-buttons">{componentToRender}</div>
      </div>
      <div className="comment-time">
        {Utils.formatDateTime(time)} {changed ? "(Изменён)" : ""}
      </div>
      <div className="comment-text">
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
};

export default Comment;
