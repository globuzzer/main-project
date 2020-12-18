import React from "react";
import Article from "../video_articles/video_articles";
import Members from "../members/members";
import Hotels from "../hotels/hotels";
import OtherTopics from "../otherTopics/otherTopics";
import bodies from "./body.module.css";

function Body() {
  return (
    <div className={bodies.container}>
      <Article />
      <Members />
      <Hotels />
      <OtherTopics />
    </div>
  );
}

export default Body;
