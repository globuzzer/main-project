import React from "react";
import Article from "../video_articles/video_articles";
import Members from "../members/members";
import Hotels from "../hotels/hotels";
import OtherTopics from "../otherTopics/otherTopics";
import "./body.css";

function Body() {
  return (
    <div className="container">
      <Article />
      <Members />
      <Hotels />
      <OtherTopics />
    </div>
  );
}

export default Body;
