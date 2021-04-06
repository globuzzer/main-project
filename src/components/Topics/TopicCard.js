import React from "react";
import styles from "./TopicCard.module.css";

const TopicCard = ({ topic, cityName }) => {
  const { text, image } = topic;
  return (
    <>
      <div
        className={styles.card} 
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={styles.text}>
          <p className={styles.title}>{text}</p>
          <p className={styles.location}>{cityName}</p>
        </div>
      </div>
    </>
  );
};

export default TopicCard;
