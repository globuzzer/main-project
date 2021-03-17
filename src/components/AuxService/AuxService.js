import React from "react";
import "./style.css";
import "../../css/Home.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import useFetchArray from "../../hooks/useFetchArray";
import { GetWindowDimension } from "../../utils/GetWindowDimension";

const AuxService = () => {
  const { items, loading } = useFetchArray("services");
  const { width } = GetWindowDimension();
     // carousel settings
     const settings = {
      dots: false,
      arrows: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
            // infinite: true,
            // dots: false
          }
        },
        {
          breakpoint: 600,
          settings: {
            arrows: false,
            slidesToShow: 2,
            slidesToScroll: 1,
            // initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            arrows: false,
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };

  const renderedServices = () => (
      items.map(({link, logo, name, des, id}) => (
        <div key={id}>
          <button type="button" className="auxservice-container">
            <a href={link} target="_new">
              <div className="aux-logo-container">
                <img src={logo} alt="logo" className="aux-logo" />
              </div>
              <div className="auxservice-bottom-container">
                <p id="find-jobs">{name}</p>
                <p className="aux-des">{des}</p>
              </div>
            </a>
          </button>
        </div>
      ))
  );

  return (
    <div style={{overflow: "scroll"}}>
      {loading ? <span>Loading...</span>
      : (
        <div
          className="aux_list"
          style={
            {display: items.length > 4 ? "" : "flex"}
            }
        >
          {items.length <= 4 ? renderedServices()
          : (
            <Slider
              {...settings}
            >
              {renderedServices()}
            </Slider>
          )}
        </div>
        )}
    </div>
  );
};

export default AuxService;
