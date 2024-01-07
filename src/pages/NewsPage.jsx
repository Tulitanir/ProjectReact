import { useNavigate } from "react-router-dom";
import News from "../components/News";
import { useState, useEffect } from "react";
import Authentication from "../utils/Auth";
function NewsPage() {
  alert(process.env.REACT_APP_API_URL);
  const [newslist, setNews] = useState([]);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const userString = localStorage.getItem("user");
  let user;

  if (userString) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  const handleCommentChange = (event) => {
    setText(event.target.value);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (!user) {
      navigate("/loginPage");
      return;
    }

    setText("");
    setTitle("");

    let request = {
      url: `${process.env.REACT_APP_API_URL}/api/news/addNews`,
      options: {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          text: text,
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
      .then((response) => {
        response.json();
      })
      .then((res) => {
        setNews(res);
      })
      .catch((error) => {
        alert("Ошибка при добавлении новости:", error);
      });
  };

  const getNews = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/news/getAll`)
      .then((response) => response.json())
      .then((res) => {
        setNews(res);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  let addForm = <></>;
  if (user) {
    const roles = user.memberRoles;
    if (roles.find((item) => item.name === "admin")) {
      addForm = (
        <section>
          <h2>Добавление новости:</h2>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Введите название"
              required
            ></input>
            <textarea
              value={text}
              onChange={handleCommentChange}
              placeholder="Введите текст новости..."
              required
            ></textarea>
            <button className="login-button" type="submit">
              Отправить
            </button>
          </form>
        </section>
      );
    }
  }

  return (
    <main>
      <div className="container">
        {addForm}
        <section>
          <div style={{ marginTop: "3rem" }}>
            {newslist.map((t) => (
              <News key={t.id} {...t} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default NewsPage;
