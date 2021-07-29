import React, { useState } from "react";
import styles from "./Services.module.css";
import BlogHeader from "../SectionHeader/BlogHeader";
import ServiceCard from "./ServiceCard";
import more from "../../assets/more.svg";
import { arraySize } from "../../utils/manageDisplayItems";

const Services = ({ city }) => {
  const { services } = city;
  const [cardsToShow, setCardsToShow] = useState(arraySize(1, 3));

  const moreCards = () => {
    let no = cardsToShow + 1;
    if (cardsToShow >= (services || []).length) {
      if (window.innerWidth <= 1100) no = 1;
          else no = 3;
    }
    return setCardsToShow(no);
  };

  const moreOrLess = () => {
    let label = "View more";
    if (cardsToShow >= (services || []).length) {
      label = "View less";
    }
    return label;
  };

  return (
    <div className={styles.wrapper}>
      <BlogHeader label="Recommend Services" />
      <div className={styles.container}>
        {(services || []).slice(0, cardsToShow).map((card) => (
          <div key={card.id}>
            <ServiceCard
              card={card}
            />
          </div>
        ))}
        <div className={styles.moreBtn} onClick={moreCards}>
          <img src={more} alt="more-icon" className={styles.moreIcon}/>
          <p
            className={styles.moreText}
          >
            {moreOrLess().includes("less") ? "Less" : "More" }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Services;