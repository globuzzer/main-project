import React from "react";
import { Link } from "react-router-dom";
import styles from "./TopicCard.module.css";

const TopicCard = ({ topic, cityName }) => {
  const { text, image, id } = topic;

  return (
    <Link
      to={{
        pathname: `${cityName}/${text.toLocaleLowerCase()}`,
        state: { topicId: id, topicName: text }
      }}
    >
      <div
        className={styles.card}
        style={{ backgroundImage: `url(${image})` }}
      >
        <div className={styles.text}>
          <p className={styles.title}>{text}</p>
          <p className={styles.location}>{cityName}</p>
        </div>
      </div>
    </Link>
  );
};

export default TopicCard;
