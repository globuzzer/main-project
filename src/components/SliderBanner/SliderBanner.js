import React from "react";
import Slider from "react-slick";
import styles from "./SliderBanner.module.css";
import "./SliderBanner.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderBanner = ({ city }) => {
  const { news } = city;

  const settings = {
    dots: true,
    dotsClass: "slider-dots",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Slider {...settings}>
          {(news || []).map((news) => (
            <div key={news.id}>
              <div 
                className={styles.eachSlide} 
                onClick={()=> window.open(news.link, "_blank")}
              >
                <div
                  style={{
                    backgroundImage: `url(${news.image})`,
                    position: "relative",
                  }}
                />
                <p className={styles.headline}>
                  {news.text}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderBanner;
