import React from "react";
import "../style/program.css";

const Program = ({ id, title, description }) => {
  return (
    <div className="program">
      <h3 className="program-title">{title}</h3>
      <p className="program-description">{description}</p>
    </div>
  );
};

export default Program;
