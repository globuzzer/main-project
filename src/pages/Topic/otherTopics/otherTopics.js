import React, { useState, useEffect } from "react";
import { otherTopics } from "../../../utils/data";
import others from "./otherTopics.module.css";

function OtherTopics() {
  const [data] = useState(otherTopics);
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
    <section className={others.othertopics}>
      <header className={others.topicsheader}>
        {smallScreen ? "Related topics" : "Other topics"}

        <div className={others.underline}></div>
      </header>

      <div className={others.cardcontainer}>
        {data.map((d) => (
          <div className={others.card} key={d.id} style={cardStyle(d)}>
            <img src={d.img} alt={d.description} />
            <div className={others.carditems}>
              <p className={others.cardItemsTop}>{d.title}</p>
              <p className={others.cardItemsBottom}>{d.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default OtherTopics;
