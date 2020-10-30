import React from "react";
import card from "./Card.module.css";

function Card({
  lists = [],
  type,
  src,
  price,
  className,
  underline,
  onClick,
  btnStyle,
}) {
  return (
    <div className={card.container}>
      <div className={card.wrapper}>
        <div className={card.flex}>
          <div className={card.free}>
            <img src={src} alt="free" />
          </div>

          <div className={card.mainHeader}>
            <header className={card.header}>{type}</header>
            <div className={`${card.underline} ${underline}`}></div>
            <p className={card.amount}>{price}€</p>
            <p className={card.time}>per month</p>
          </div>
        </div>

        <ul className={card.items}>
          {lists.map((list, index) => (
            <li key={index} className={className}>
              {list.title}
            </li>
          ))}
        </ul>

        <div className={card.btnDiv}>
          <button onClick={onClick} style={btnStyle}>
            Choose
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
