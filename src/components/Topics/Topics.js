import React, { useState } from "react";
import styles from "./Topics.module.css";
import BlogHeader from "../SectionHeader/BlogHeader";
import TopicCard from "./TopicCard";
import arrow from "../../assets/arrow-icon.svg";

const Topics = ({ city, cityName }) => {
  const { topics } = city;
  const arraySize = () => {
    let size;
    (window.innerWidth <= 900) ? (size = 6) : (size = 9);
    return size;
  };
  const [cardsToShow, setCardsToShow] = useState(arraySize());

  const moreCards = () => {
    let no = cardsToShow + 3;
    if (cardsToShow >= (topics || []).length) {
      if (window.innerWidth <= 1100) no = 3;
      else no = 6;
    }
    return setCardsToShow(no);
  };

  const moreOrLess = () => {
    let label = "View more";
    if (cardsToShow >= (topics || []).length) {
      label = "View less";
    }
    return label;
  };

  return (
    <div className={styles.wrapper}>
      <BlogHeader label="Top Topics to explore" />
      <div className={styles.container}>
        {(topics || []).slice(0, cardsToShow).map((topic) => (
          <div
            key={topic.id}
          >
            <TopicCard
              topic={topic}
              cityName={cityName}
            />
          </div>
        ))}
      </div>
      <button
        type="button"
        className={styles.moreBtn}
        onClick={moreCards}
      >
        {moreOrLess().includes("less") ? "View Less" : "View More"}
      </button>
      <div
        className={styles.moreDesk}
      >
        <p
          className={styles.moreLink}
          onClick={moreCards}
        >
          {moreOrLess().includes("less") ? "See Less topics" : "See More topics"}
          <img src={arrow} alt="arrow-icon" className={styles.arrow} />
        </p>
      </div>
    </div>
  );
};

export default Topics;
