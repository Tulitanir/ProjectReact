import React from "react";
import Utils from "../utils/Utils";

const Comment = ({ memberId, newsId, name, surname, text, time }) => {
  return (
    <div className="comment">
      <div className="newsTitle">{`${name} ${surname}`}</div>
      <div className="newsDate">{Utils.formatDateTime(time)}</div>
      <div className="newsText">{text}</div>
    </div>
  );
};

export default Comment;
