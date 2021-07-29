import React from "react";
import {Carousel} from "react-responsive-carousel";
import ReactPlayer from "react-player";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./style.css";

const YoutubeSlide = (props) => {
  const { videoData } = props;
  const { url, text, coverImg, id } = videoData;

  return (
    <div>
      <ReactPlayer url={url} width="100%" height="540px"/>
      <p className="legend">{text}</p>
    </div>
  );
};
  export const VideoCarousel = ({ videos }) => (
    <div className="carousel_container">
      <Carousel showArrows={false} showThumbs={false}>
        {(videos || []).map((videoData) => (
          <div key={videoData.id}>
            <YoutubeSlide videoData={videoData} />
          </div>
        ))}
      </Carousel>
    </div>
  );
