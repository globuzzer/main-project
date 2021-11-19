import React, { useState, useEffect } from "react";
import BlogHeader from "../../SectionHeader/BlogHeader";
import styles from "./otherTopics.module.css";

function OtherTopics({ topic }) {

  const { otherTopic } = topic;

  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", checkScreen);
    checkScreen();
  }, []);


  const checkScreen = () => {
    if (window.innerWidth <= 500) setSmallScreen(true);
  };

  const cardStyle = (d) => {
    if (smallScreen) {
      return {
        backgroundImage: `url(${d.img})`,
        height: "110px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      };
    }
  };
  return (
    <section className={styles.othertopics}>
      <header>
        <BlogHeader label='Other topics' />
      </header>
      
      <div className={styles.cardcontainer}>
        {otherTopic && otherTopic.map((d) => (
          <div className={styles.card} key={d.id} style={cardStyle(d)}>
            <img src={d.img} alt={d.description} />
            <div className={styles.carditems}>
              <p className={styles.cardItemsTop}>{d.title}</p>
              <p className={styles.cardItemsBottom}>{d.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OtherTopics;
