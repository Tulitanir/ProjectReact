import { useLocation } from "react-router-dom";
import News from "../components/News";
import { useState, useEffect } from "react";
import Comment from "../components/Comment";

function NewsInfo() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const title = searchParams.get("title");
  const date = searchParams.get("date");
  const text = searchParams.get("text");

  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/api/news/getComments?id=${id}`)
      .then((response) => response.json())
      .then((res) => setComments(res));
    console.log(comments);
  }, []);

  return (
    <div className="container">
      <section>
        <div style={{ marginTop: "3rem" }}></div>
        <News id={id} title={title} date={date} text={text} />
      </section>
      <section>{/* Добавление комментария */}</section>
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
