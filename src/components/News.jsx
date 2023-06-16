import Utils from "../utils/Utils";
import { Link } from "react-router-dom";
import "../style/news.css";
import "../style/comment.css";

function News({ id, title, date, text }) {
  return (
    <div className="news">
      <Link
        to={{
          pathname: "/newsInfo",
          search: `?id=${id}&title=${encodeURIComponent(
            title
          )}&date=${date}&text=${encodeURIComponent(text)}`,
        }}
      >
        <div className="news-header">
          <div className="news-title">{title}</div>
        </div>
        <div className="comment-buttons"></div>
      </Link>
      <div className="news-date">{Utils.formatDateTime(date)}</div>
      <div className="news-text">{text}</div>
    </div>
  );
}

export default News;
