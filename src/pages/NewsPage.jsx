import News from "../components/News";
import { useState, useEffect } from "react";
function NewsPage() {
  const [newslist, setNews] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/news/getAll")
      .then((response) => response.json())
      .then((res) => setNews(res));
  }, []);

  return (
    <main>
      <div className="container">
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
