import React from "react";
import styles from "./TopicCard.module.css";

const TopicCard = ({ topic, cityName }) => {
  const { text, image, link } = topic;
  return (
    <>
      <div
        className={styles.card} 
        style={{ backgroundImage: `url(${image})` }}
        onClick={()=> window.open(link, "_blank")}
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
