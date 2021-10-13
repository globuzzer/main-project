import React, { useEffect, useState, Fragment } from 'react';
import banner from "./banner.module.css";
import { IconContext } from "react-icons";
import Youtube from "react-youtube";
import {
  IoIosArrowForward,
} from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { SiSkillshare } from "react-icons/si";
import { RiShareForwardBoxFill } from "react-icons/ri";
import playButton from '../../../../src/assets/Topic/playButton.png';

const Banner = ({ topics }) => {

  const [banners, setBanners] = useState([]);
  const [currentData, setCurrentData] = useState([]);
  const [currentTitle, setCurrentTitle] = useState('');

  const [video, setVideo] = useState({
    playVideo: false,
    videoId: "",
  });

  const opts = {
    width: "100%",
    height: "380px",
    playerVars: {
      autoplay: 1,
    },
  };

  useEffect(() => {
    getData()
  }, [topics])

  const getData = () => {
    const init = topics.banner && topics.banner.filter(d => d.id === 1);
    const bannerList = topics && topics.banner;
    const current = topics.banner && topics.banner[0].title.toLocaleLowerCase();
    
    setCurrentData(init);
    setBanners(bannerList);
    setCurrentTitle(current);
  }

  const changeList = current => {
    const init = banners.filter(l => l.title.toLocaleLowerCase() === current
    );

    setCurrentData(init);
    setCurrentTitle(current);
    setVideo({ playVideo: false, videoId: "" });
  }

  const listStyle = (desc) => {
    if (desc.toLocaleLowerCase() === currentTitle) {
      return {
        background: "#FF889E",
      };
    }
  };

  const closeList = () => {
    setCurrentData("");
  };

  //for video
  const onReady = (e) => {
    e.target.playVideo();
  };

  const closeVideo = () => {
    const newVideo = { ...video };
    newVideo.playVideo = false;
    newVideo.videoId = "";

    setVideo(newVideo);
  };

  const playVideo = ({ videoId }) => {
    const newVideo = { ...video };
    newVideo.playVideo = true;
    newVideo.videoId = videoId;

    setVideo(newVideo);
  };

  return (
    <>
      <div className={banner.list}>
        {banners && banners.map(item =>
          <div
            key={item.id}
            className={banner.listflex}
            onMouseOver={() => changeList(item.title.toLocaleLowerCase())}
            style={listStyle(item.title.toLocaleLowerCase())}
          >
            <span>
              <img src={item.icon} alt={item.title} style={{ width: 50 }} />
            </span>
            <span>{item.title}</span>
          </div>
        )}
      </div>

      {video.playVideo && (
        <div className={`${banner.video} ${banner.bannervideo}`}>
          <span onClick={closeVideo} className={banner.closeIcon}>
            <IconContext.Provider value={{ className: "icon" }}>
              <AiOutlineCloseCircle />
            </IconContext.Provider>
          </span>
          <Youtube videoId={video.videoId} opts={opts} onReady={onReady} />
        </div>
      )}


      {!video.playVideo && currentData && (
        <div className={banner.listitem}>
          {currentData.map(d => (
            <Fragment key={d.id}>
              <div className={banner.listleft}>
                <img src={d.img} alt="helsinki" id={banner['list']} />
                <div className={banner.listdesc}>
                  <div className={banner.listVid} onClick={() => playVideo(d)}>
                    <img src={playButton} alt="playButton" id={banner['listVid']} />
                  </div>
                  <p>Accomodation in Helsinki</p>
                </div>

                <IconContext.Provider value={{ className: "forward" }}>
                  <RiShareForwardBoxFill className={banner.forward} />
                </IconContext.Provider>
              </div>

              <div className={banner.listright}>
                <header>
                  <span>{d.title}</span>{" "}
                  <span onClick={closeList}>
                    <IconContext.Provider value={{ className: "icon" }}>
                      <AiOutlineCloseCircle />
                    </IconContext.Provider>
                  </span>
                </header>

                <div className={banner.listpara}>
                  <p>
                    {d.content}
                  </p>
                </div>

                <div className={banner.listmore}>
                  <p>
                    View more details{" "}
                    <IconContext.Provider
                      value={{ className: "icon arrow-right" }}
                    >
                      <IoIosArrowForward className={banner.arrowRight} />
                    </IconContext.Provider>
                  </p>

                  <p>
                    share this video
                    <IconContext.Provider value={{ className: "icon share" }}>
                      <SiSkillshare className={`${banner.share} ${banner.icon}`} />
                    </IconContext.Provider>
                  </p>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      )}

    </>
  )
}

export default Banner
