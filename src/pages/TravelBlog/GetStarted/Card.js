import React from "react";
import card from "./Card.module.css";

function Card({ lists = [], type, src }) {
  return (
    <div className={card.container}>
      <div className={card.wrapper}>
        <div className={card.flex}>
          <div className={card.free}>
            <img src={src} alt="free" />
          </div>

          <div className={card.mainHeader}>
            <header className={card.header}>{type}</header>
            <div className={card.underline}></div>
            <p className={card.amount}>0.00$</p>
            <p className={card.time}>per month</p>
          </div>
        </div>

        <ul className={card.items}>
          <li>Something</li>
        </ul>

        <div className={card.btnDiv}>
          <button>Choose</button>
        </div>
      </div>
    </div>
  );
}

export default Card;
