import React, { useState, useEffect, useContext, useRef } from "react";
import ArticleCard from "./article_card";
import Youtube from "react-youtube";
import playButton from "../../../assets/Topic/playButton.png";
import { IconContext } from "react-icons";
import { AiOutlineCloseCircle } from "react-icons/ai";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosArrowForward,
} from "react-icons/io";
import { SiSkillshare } from "react-icons/si";
import { sliceData } from "../sliceData";
import { articleRefContext } from "../../../contexts/Refs";
import videos from "./video_articles.module.css";
import { firestore } from "../../../utils/firebase.utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderBanner from "./SliderBanner";
import SearchMore from "./SearchMore";
import GroupButtons from "./GroupButtons";


function Article({ topicId }) {
  const [videoData, setVideoData] = useState([]);
  const [articleData, setArticleData] = useState([]);

  const [input, setInput] = useState(""); // for searching videos or articles
  //for mapping out data depending if video or article is chosen
  const [data, setData] = useState([]);
  //for knowing whether the user is on video or articles --- initial is video
  const [title, setTitle] = useState("videos");
  //for checking row size when slicing
  const [rowSize, setRowSize] = useState(null);
  //All videos state
  const [vid, setVid] = useState([]);
  const [video, setVideo] = useState({
    playVideo: false,
    videoId: "",
  });
  const [videoSize, SetVideoSize] = useState(8);
  const [firstVideos, setFirstVideos] = useState([]);
  const [secondVideos, setSecondVideos] = useState([]);
  //All article states
  const [article, setArticle] = useState([]);
  const [articleVideo, setArticleVideo] = useState({
    playVideo: false,
    videoId: "",
  });
  const [articleSize, SetArticleSize] = useState(8);
  const [firstArticles, setFirstArticles] = useState([]);
  const [secondArticles, setSecondArticles] = useState([]);
  //slideshow state
  const [slideShow, setSlideShow] = useState([]);
  //section video_articles ref
  const articleRef = useContext(articleRefContext);
  const artRef = useRef(null);

  useEffect(() => {
    const width = window.innerWidth;
    window.addEventListener("resize", handleSize);

    if (width <= 768) {
      SetVideoSize(4);
      SetArticleSize(4);
    }

    //setting rowSize on load
    if (width <= 500) setRowSize(1);
    if (width >= 517 && width < 774) setRowSize(2);
    if (width >= 774 && width < 900) setRowSize(3);
    if (width >= 900 && width < 1014) setRowSize(2);
    if (width >= 1014 && width < 1344) setRowSize(3);
    if (width >= 1344) setRowSize(4);
  }, []);

  useEffect(() => {
    getData()
  }, [topicId]);

  const getData = async () => {

    const doc = await firestore.collection('accomodation_live').doc(topicId).get();

    if (!doc.exists) {
      console.log('no');
    } else {
      setData(doc.data().videoData)
      setVideoData(doc.data().videoData)
      setArticleData(doc.data().articleData)
      setSlideShow(doc.data().news)
    }
  }


  const handleSize = () => {
    //setting rowSize while resized
    const width = window.innerWidth;
    if (width <= 500) setRowSize(1);
    if (width >= 517 && width < 774) setRowSize(2);
    if (width >= 774 && width < 900) setRowSize(3);
    if (width >= 900 && width < 1014) setRowSize(2);
    if (width >= 1014 && width < 1344) setRowSize(3);
    if (width >= 1344) setRowSize(4);

    if (window.innerWidth <= 768) {
      SetVideoSize(4);
      SetArticleSize(4);
      return;
    }

    SetVideoSize(8);
    SetArticleSize(8);
  };



  const slicedData = sliceData(
    data,
    0,
    title === "videos" ? videoSize : articleSize
  );

  const render =
    input.length > 2
      ? data.filter(
        (article) =>
          article.title.toLocaleLowerCase().startsWith(input) ||
          article.title.toLocaleLowerCase().endsWith(input) ||
          article.title.toLocaleLowerCase().includes(input)
      )
      : slicedData;

  const articleLikes = ({ likes }) => {
    if (likes < 1) return "";
    if (likes > 999) {
      const render = likes % 1000;
      if (render > 99) return `${(likes / 1000).toFixed(1)}k`;
      return `${(likes / 1000).toFixed(0)}k`;
    }
    return likes;
  };

  const moreArticle = () => {
    if (title === "videos") {
      let size = videoSize + 4;
      if (videoSize >= data.length) {
        if (window.innerWidth <= 900) size = 4;
        else size = 8;
      }
      return SetVideoSize(size);
    }

    let size = articleSize + 4;

    if (articleSize >= data.length) {
      if (window.innerWidth <= 900) size = 4;
      else size = 8;
    }
    SetArticleSize(size);
  };

  const moreOrLess = () => {
    let render = "more";

    if (title === "videos" && videoSize >= data.length) render = "less";

    if (title === "articles" && articleSize >= data.length) render = "less";

    return `${render} ${title}`;
  };


  const onReady = (e) => {
    e.target.playVideo();
  };

  const playVideo = ({ videoId }) => {
    if (title === "videos") {
      const newVideo = { ...video };
      newVideo.playVideo = true;
      newVideo.videoId = videoId;

      return setVideo(newVideo);
    }

    const newVideo = { ...articleVideo };
    newVideo.playVideo = true;
    newVideo.videoId = videoId;

    setArticleVideo(newVideo);
  };

  const closeVideo = () => {
    if (title === "videos") {
      const newVideo = { ...video };
      newVideo.playVideo = false;
      newVideo.videoId = "";

      return setVideo(newVideo);
    }

    const newVideo = { ...articleVideo };
    newVideo.playVideo = false;
    newVideo.videoId = "";

    setArticleVideo(newVideo);
  };

  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  const originalData = () => {
    const renderData = (
      <ArticleCard
        render={render}
        artRef={artRef}
        articleHover={articleHover}
        showArticle={showArticle}
        setArticle={setArticle}
        playButton={playButton}
        title={title}
        heart={heart}
        articleLikes={articleLikes}
      />
    );

    if (title === "videos") {
      if (firstVideos.length < 1) return renderData;
    } else {
      if (firstArticles.length < 1) return renderData;
    }
  };

  const articleHover = (art) => {
    if (title === "articles" && article.length > 0) {
      setArticle([art]);
      setArticleVideo({ playVideo: false, videoId: "" });
    }

    if (title === "videos" && vid.length > 0) {
      setVid([art]);
      setVideo({ playVideo: false, videoId: "" });
    }
  };

  const showArticle = (art, index) => {
    const arts = [...render];
    let newArts, secondArts;

    let newIndex = index + 1;
    let k = rowSize;
    if (newIndex > rowSize) {
      if (newIndex % rowSize === 0) {
        k = newIndex;
      } else {
        k = Math.floor(newIndex / rowSize) * rowSize + rowSize;
      }
    }
    newArts = arts.slice(0, k);
    secondArts = arts.slice(k);

    if (title === "videos") {
      if (firstVideos.length > 0) {
        const i = arts.indexOf(art);
        if (i > rowSize) {
          if (i % rowSize === 0) {
            k = i;
          } else {
            k = Math.floor(i / rowSize) * rowSize + rowSize;
          }
        }
        newArts = arts.slice(0, k);
        secondArts = arts.slice(k);
      }
      setFirstVideos(newArts);
      setSecondVideos(secondArts);
      setVid([art]);
      setVideo({ playVideo: false, videoId: "" });
      return;
    }

    if (firstArticles.length > 0) {
      const i = arts.indexOf(art);
      if (i > rowSize) {
        if (i % rowSize === 0) {
          k = i;
        } else {
          k = Math.floor(i / rowSize) * rowSize + rowSize;
        }
      }
      newArts = arts.slice(0, k);
      secondArts = arts.slice(k);
    }
    setFirstArticles(newArts);
    setSecondArticles(secondArts);
    setArticle([art]);
    setArticleVideo({ playVideo: false, videoId: "" });
  };

  const closeArticle = () => {
    window.innerWidth <= 768 ? SetArticleSize(4) : SetArticleSize(8);
    setArticle([]);
    setFirstArticles([]);
    setSecondArticles([]);
  };

  const closeVid = () => {
    window.innerWidth <= 768 ? SetVideoSize(4) : SetVideoSize(8);
    if (window.innerWidth <= 515) SetVideoSize(4);
    setVid([]);
    setFirstVideos([]);
    setSecondVideos([]);
  };

  const heart = (article) => {
    const allData = [...data];

    const newArticle = allData.find((d) => d.id === article.id);
    if (newArticle.liked) newArticle.likes -= 1;
    else newArticle.likes += 1;

    newArticle.liked = !newArticle.liked;
    setData(allData);
  };

  return (
    <section className={videos.article} ref={articleRef}>
      <div className={videos.articleLeft}>
        <GroupButtons
          input={input}
          setInput={setInput}
          title={title}
          setTitle={setTitle}
          videoData={videoData}
          articleData={articleData}
          setData={setData}
        />

        {/* original data */}
        <div className={videos.articleCardContainer}>{originalData()}</div>

        {/*Fist Articles after click */}
        <div className={videos.articleCardContainer}>
          <ArticleCard
            render={title === "videos" ? firstVideos : firstArticles}
            artRef={artRef}
            articleHover={articleHover}
            showArticle={showArticle}
            playButton={playButton}
            title={title}
            heart={heart}
            articleLikes={articleLikes}
          />
        </div>

        {!video.playVideo &&
          title === "videos" &&
          vid.map((v) => (
            <div className={videos.vid} key={v.id}>
              <img src={v.imgPath} alt="img" id={videos['vidImg']} />
              <div className={videos.playVid} onClick={() => playVideo(v)}>
                <img src={playButton} alt="playButton" id={videos['playVid']} />
              </div>

              <div onClick={closeVid}>
                <IconContext.Provider value={{ className: " vidClose" }}>
                  <AiOutlineCloseCircle className={videos.vidClose} />
                </IconContext.Provider>
              </div>
            </div>
          ))}

        {title === "videos" && video.playVideo && (
          <div className={videos.video}>
            <span onClick={closeVideo}>
              <IconContext.Provider value={{ className: "icon" }}>
                <AiOutlineCloseCircle className={videos.icon} />
              </IconContext.Provider>
            </span>
            <Youtube videoId={video.videoId} opts={opts} onReady={onReady} />
          </div>
        )}

        {title === "articles" && articleVideo.playVideo && (
          <div className={videos.video}>
            <span onClick={closeVideo}>
              <IconContext.Provider value={{ className: "icon" }}>
                <AiOutlineCloseCircle className={videos.icon} />
              </IconContext.Provider>
            </span>
            <Youtube
              videoId={articleVideo.videoId}
              opts={opts}
              onReady={onReady}
            />
          </div>
        )}

        {!articleVideo.playVideo &&
          title === "articles" &&
          article.map((a) => (
            <div className={videos.helsinki} key={a.id}>
              <div className={videos.helsinkileft}>
                <img src={a.article.img.path} alt="helsinki" id={videos['helsinki']} />

                <div className={videos.helsinkidesc}>
                  <span onClick={() => playVideo(a)}>
                    <img src={playButton} alt="playButton" id={videos['playImg']} />
                  </span>

                  <p>{a.article.img.title}</p>
                </div>
              </div>

              <div className={videos.helsinkiright}>
                <header>
                  <p>{a.title}</p>
                  <p onClick={closeArticle}>
                    <IconContext.Provider
                      value={{ className: "icon helsinki-close" }}
                    >
                      <AiOutlineCloseCircle />
                    </IconContext.Provider>
                  </p>
                </header>

                <div className={videos.para}>
                  <p>{a.article.content}</p>
                </div>

                <div className={`${videos.listmore} ${videos.listMoreArticle}`}>
                  <p>
                    View more details{" "}
                    <IconContext.Provider
                      value={{ className: "icon arrow-right" }}
                    >
                      <IoIosArrowForward />
                    </IconContext.Provider>
                  </p>

                  <p>
                    share this video
                    <IconContext.Provider
                      value={{ className: "icon share article-share" }}
                    >
                      <SiSkillshare />
                    </IconContext.Provider>
                  </p>
                </div>
              </div>
            </div>
          ))}

        {/*Second Articles after click*/}
        <div className={videos.articleCardContainer}>
          <ArticleCard
            render={title === "videos" ? secondVideos : secondArticles}
            artRef={artRef}
            articleHover={articleHover}
            showArticle={showArticle}
            setArticle={setArticle}
            playButton={playButton}
            title={title}
            heart={heart}
            articleLikes={articleLikes}
          />
        </div>

        <div className={videos.moreArticles} onClick={moreArticle}>
          <p>
            <IconContext.Provider value={{ className: "arrow-down" }}>
              {moreOrLess().includes("less") ? (
                <IoIosArrowUp className={videos.arrowDown} />
              ) : (
                <IoIosArrowDown className={videos.arrowDown} />
              )}
            </IconContext.Provider>
            {moreOrLess()}
          </p>

          <p>
            see more{" "}
            <IconContext.Provider value={{ className: "arrow-down" }}>
              <IoIosArrowDown />
            </IconContext.Provider>
          </p>
        </div>
      </div>

      <div className={videos.articleRight}>
        <div className={videos.articleRightTop}>
          <SliderBanner news={slideShow} />
        </div>

        <div className={videos.articleRightBottom}>
          <SearchMore />
        </div>
      </div>
    </section>
  );
}

export default Article;
