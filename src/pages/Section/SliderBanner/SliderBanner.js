import React from 'react';
import styles from './SliderBanner.module.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {GetWindowDimension} from '../../../utils/GetWindowDimension';
import sliderImg from '../../../assets/Section/slider-banner.jpg';

const SliderBanner = () => {
    const slideImage = [sliderImg, sliderImg, sliderImg];
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 3000,
      arrows: false
    };
  const {width}=GetWindowDimension();
    const sliderStyle = ()=> ({
      width:`${width}px`
    })
    return (
        <div className={styles.wrapper} style={sliderStyle()}>
        <div className={styles.container}>
          <Slider {...settings}>
            {slideImage.map((image, index) => (
              <div className={styles.eachSlide} key={index}>
                <div style={{ backgroundImage: `url(${image})`, position:"relative" }} />
                <p className={styles.headline}>Google launches educational coronavirus website</p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    );
}

export default SliderBanner;
