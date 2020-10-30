import React from "react";

export default function circleWrapper({
  container,
  circle,
  number,
  label,
  style = null,
  lineClass,
}) {
  return (
    <div className={container}>
      <div className={circle} style={style}>
        {number}
      </div>

      <div className={lineClass}></div>
      <p>{label}</p>
    </div>
  );
}
