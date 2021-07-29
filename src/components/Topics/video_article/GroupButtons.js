import React from 'react';
import { BsSearch } from "react-icons/bs";
import { IconContext } from "react-icons";
import videos from "./video_articles.module.css";

const GroupButtons = (props) => {

  const { input, setInput, title, setTitle, videoData, articleData, setData } = props;

  const btnStyle = (a) => {
    if (a === "video") {
      return {
        background: title === "videos" && "#f24b6a",
        color: title === "videos" && "#fff",
      };
    } else {
      return {
        background: title === "articles" && "#f24b6a",
        color: title === "articles" && "#fff",
      };
    }
  };

  const handleClick = ({ target: btn }) => {
    if (btn.innerText.toLocaleLowerCase() === "video") {
      setData(videoData);
      setTitle("videos");
    } else {
      setData(articleData);
      setTitle("articles");
    }
  };

  return (
    <>
      <div className={videos.btnGroup}>
        <button
          className={`${videos.btn} ${videos.btnVid}`}
          onMouseOver={handleClick}
          style={btnStyle("video")}
        >
          Video
        </button>

        <button
          className={`${videos.btn} ${videos.btnArt}`}
          onMouseOver={handleClick}
          style={btnStyle("article")}
        >
          Article
        </button>
      </div>

      <div className={videos.search}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Search ${title} here...`}
          id="search_input"
        />

        <IconContext.Provider value={{ className: "a-search" }}>
          <BsSearch className={videos.searchIcon} />
        </IconContext.Provider>
      </div>
    </>
  )
}

export default GroupButtons
