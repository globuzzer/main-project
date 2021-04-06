import React from "react";
import Slider from "react-slick";
import styles from "./Vimeo.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Vimeo = ({ city }) => {
  const { advertisements } = city;

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
    <>
      <div className={styles.mainContainer}>
        <Slider {...settings}>
          {(advertisements || []).map((adv) => (
            <div key={adv.id}>
              <div
                className={styles.wrapper}
                style={{background: adv.bgColor}}
              >
                <div className={styles.container}>
                  <img src={adv.logo} alt="logo"/>
                  <p className={styles.caption}>{adv.text1}</p>
                  <p className={styles.text}>{adv.text2}</p>
                </div>
                <button 
                  type="button"
                  className={styles.btn} 
                  style={{background: adv.btColor}}
                >
                  Learn more
                </button>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
};

export default Vimeo;
