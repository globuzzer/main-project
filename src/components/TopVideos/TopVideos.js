import React from "react";
import BlogHeader from "../SectionHeader/BlogHeader";
import { VideoCarousel } from "../VideoCarousel/VideoCarousel";

const TopVideos = ({ city }) => {
const { videos } = city;
  return (
    <div>
      <BlogHeader label="Top Videos to see"/>
      <div>
        <VideoCarousel videos={videos}/>
      </div>
    </div>
  );
};

export default TopVideos;
