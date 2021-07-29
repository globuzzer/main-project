import React from "react";
import { IconContext } from "react-icons";
import { RiShareForwardBoxFill } from "react-icons/ri";
import { BsHeart, BsHeartFill } from "react-icons/bs";
import videos from "./video_articles.module.css";

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
      className={videos.articleCard}
      key={article.id}
      onMouseOver={() => articleHover(article)}
      ref={artRef}
    >
      <span onClick={() => showArticle(article, index)}>
        <img src={article.imgPath} alt={article.title} id="article-card-img" />
      </span>
      <IconContext.Provider value={{ className: "forward" }}>
        <RiShareForwardBoxFill className={videos.forward} />
      </IconContext.Provider>

      <div
        className={videos.play}
        style={{ display: title === "videos" && "block" }}
        onClick={() => showArticle(article, index)}
      >
        <img src={playButton} alt="playButton" id={videos['playVid']} />
      </div>

      <div className={videos.desc}>
        <header>{article.title}</header>

        <div className={videos.descItems}>
          <div className={videos.descLeft}>
            <img src={article.userImg} alt={article.title} id="article-card-img" style={{ width: 40 }} />
            <p>{article.name}</p>
          </div>

          <div className={videos.descRight}>
            <span onClick={() => heart(article)}>
              {article.liked ? (
                <IconContext.Provider value={{ className: "heart" }}>
                  <BsHeartFill className={videos.heart} />
                </IconContext.Provider>
              ) : (
                <IconContext.Provider value={{ className: "heart" }}>
                  <BsHeart className={videos.heart} />
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
