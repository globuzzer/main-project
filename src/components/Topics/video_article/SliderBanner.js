import React from 'react'
import Slider from 'react-slick';
import videos from "./video_articles.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SliderBanner = ({ news }) => {

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
    <Slider {...settings}>
      {news && news.map(n => (
        <div
          className={videos.slide} key={n.id}
          onClick={() => window.open(n.link, "_blank")}
        >
          <img src={n.image} alt="mask" />
          <div className={videos.slideItems}>
            <p>{n.text}</p>
          </div>
        </div>
      ))}
    </Slider>
  )
}

export default SliderBanner
