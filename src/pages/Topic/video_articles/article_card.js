import React from "react";
import { IconContext } from "react-icons";
import { RiShareForwardBoxFill } from "react-icons/ri";
import { BsHeart, BsHeartFill } from "react-icons/bs";

function Article_card({
  render,
  artRef,
  articleHover,
  showArticle,
  playButton,
  title,
  heart,
  articleLikes,
}) {
  return render.map((article, index) => (
    <div
      className="article-card"
      key={article.id}
      onMouseOver={() => articleHover(article)}
      ref={artRef}
    >
      <span onClick={() => showArticle(article, index)}>
        <img src={article.imgPath} alt={article.title} id="article-card-img"/>
      </span>
      <IconContext.Provider value={{ className: "forward" }}>
        <RiShareForwardBoxFill />
      </IconContext.Provider>

      <div
        className="play"
        style={{ display: title === "videos" && "block" }}
        onClick={() => showArticle(article, index)}
      >
        <img src={playButton} alt="playButton" id="playImg" />
      </div>

      <div className="desc">
        <header>{article.title}</header>

        <div className="desc-items">
          <div className="desc-left">
            <img src={article.userImg} alt={article.title} />
            <p>{article.name}</p>
          </div>

          <div className="desc-right">
            <span onClick={() => heart(article)}>
              {article.liked ? (
                <IconContext.Provider value={{ className: "heart" }}>
                  <BsHeartFill />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ className: "heart" }}>
                  <BsHeart />
                </IconContext.Provider>
              )}
            </span>
            {articleLikes(article)}
          </div>
        </div>
      </div>
    </div>
  ));
}

export default Article_card;
