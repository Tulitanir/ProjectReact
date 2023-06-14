import Utils from "../utils/Utils";
import { Link } from "react-router-dom";

function News({ id, title, date, text }) {
  return (
    <div className="news">
      <Link
        to={{
          pathname: "/newsInfo",
          search: `?id=${id}&title=${title}&date=${date}&text=${text}`,
        }}
      >
        <div className="newsTitle">{title}</div>
      </Link>
      <div className="newsDate">{Utils.formatDateTime(date)}</div>
      <div className="newsText">{text}</div>
    </div>
  );
}

export default News;
