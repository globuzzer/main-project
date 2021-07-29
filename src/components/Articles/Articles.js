import React from "react";
import Slider from "react-slick";
import styles from "./Articles.module.css";
import "./Articles.css";
import BlogHeader from "../SectionHeader/BlogHeader";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import heart from "../../assets/heart-button.svg";
import { GetWindowDimension } from "../../utils/GetWindowDimension";

const Articles = ({ city }) => {
  const { width } = GetWindowDimension();
  const { articles } = city;

  const mappedArticles = () => (
    (articles || []).map((data) => (
      <div
        className={styles.eachSlide}
        key={data.id}
        onClick={()=> window.open(data.link, "_blank")}
      >
        <div className={styles.card}>
          <div
            className={styles.top}
            style={{ backgroundImage: `url(${data.coverImg})` }}
          >
            <p className={styles.title}>{data.title}</p>
          </div>
          <div className={styles.bottom}>
            <div className={styles.author}>
              <img src={data.authImg} alt="author" className={styles.img} />
              <p className={styles.name}>{data.authName}</p>
            </div>
            <div className={styles.likes}>
              <img
                src={heart}
                alt="heart-button"
                className={styles.heart}
              />
              <p className={styles.number}>{data.likes}</p>
            </div>
          </div>
        </div>
      </div>
    ))
  );

  const ArticlesMobile = () => {
    return (
      <div className={styles.mobile}>
        <div className={styles.items}>
          {mappedArticles()}
        </div>
        <button
          className={styles.moreBtn}
          type="button"
        >
          View More
        </button>
      </div>
    );
  };

  const ArticlesDesk = () => {
    const settings = {
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      className: "slider variable-width",
      variableWidth: true,
    };
    return (
      <div className="articles">
        <Slider
          {...settings}
          className={styles.articles}
        >
          {mappedArticles()}
        </Slider>
      </div>
    );
  };
  return (
    <div
      className={styles.wrapper}
      style={{ display: "grid", gridGap: "30px" }}
    >
      <BlogHeader label="Top Articles to see" />
      {width >= 1100 ? ArticlesDesk() : ArticlesMobile()}
    </div>
  );
};

export default Articles;
