import { useLocation, useNavigate } from "react-router-dom";
import News from "../components/News";
import { useState, useEffect } from "react";
import Comment from "../components/Comment";

import Authentication from "../utils/Auth";

function NewsInfo() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const title = searchParams.get("title");
  const date = searchParams.get("date");
  const text = searchParams.get("text");

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const navigate = useNavigate();

  const getComments = () => {
    fetch(`http://backend:8080/api/news/getComments?id=${id}`)
      .then((response) => response.json())
      .then((res) => {
        setComments(res);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    getComments();
  }, []);

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      navigate("/loginPage");
      return;
    }

    setNewComment("");

    let request = {
      url: "http://backend:8080/api/news/addComment",
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newsId: id,
          memberId: user.id,
          text: newComment,
        }),
      },
    };

    const res = await Authentication.fetchWithAuth(
      request.url,
      request.options
    );
    console.log(res);
    request.url = res.url;
    request.options = res.options;
    console.log(request);
    if (!request) {
      localStorage.clear();
      navigate("/loginPage");
    }

    fetch(request.url, request.options)
      .then((response) => response.json())
      .then((res) => {
        setComments(res);
      })
      .catch((error) => {
        alert("Ошибка при отправке комментария:", error);
      });

    getComments();
  };

  return (
    <div className="container">
      <section>
        <div style={{ marginTop: "3rem" }}></div>
        <News id={id} title={title} date={date} text={text} />
      </section>
      <section>
        <h2>Добавление комментария:</h2>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Введите ваш комментарий..."
            required
          ></textarea>
          <button className="login-button" type="submit">
            Отправить
          </button>
        </form>
      </section>
      <h2>Комментарии: </h2>
      <section>
        <div style={{ marginTop: "3rem" }}></div>
        {comments.map((t) => (
          <Comment key={t.id} {...t} />
        ))}
      </section>
    </div>
  );
}

export default NewsInfo;
