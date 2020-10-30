import React from "react";

export default function circleWrapper({
  container,
  circle,
  number,
  label,
  style = null,
}) {
  return (
    <div className={container}>
      <div className={circle} style={style}>
        {number}
      </div>

      <p>{label}</p>
    </div>
  );
}
