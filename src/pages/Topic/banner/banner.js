import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Youtube from "react-youtube";
import { IconContext } from "react-icons";
import {
  IoMdArrowDropright,
  IoIosArrowForward,
  IoIosArrowDown,
} from "react-icons/io";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { SiSkillshare, SiAdguard } from "react-icons/si";
import { RiHotelLine, RiShareForwardBoxFill } from "react-icons/ri";
import { BiDollarCircle } from "react-icons/bi";
import { VscGlobe } from "react-icons/vsc";
import playButton from "../images/playButton.png";
import { list } from "../../../utils/data";
import { hotelRefContext, articleRefContext } from "../../../contexts/refs";
import banner from "./banner.module.css";

function Banner() {
  const [data, setData] = useState([]);
  const [current, setCurrent] = useState("visa issue");
  const [video, setVideo] = useState({
    playVideo: false,
    videoId: "",
  });
  const [select, setSelect] = useState("");
  const [showList, setShowList] = useState(false);
  const [height, setHeight] = useState("114px");

  const hotelRef = useContext(hotelRefContext);
  const articleRef = useContext(articleRefContext);

  //for loading in banner list (loads in visa issue on page load)
  useEffect(() => {
    //sets list as visa issue on page load
    const init = list.filter((l) => l.id === 1);
    setData(init);

    //checks width of page and sets height of select nav
    changeHeight();
    window.addEventListener("resize", changeHeight);
  }, []);

  useEffect(() => {
    if (select.includes("short"))
      return window.scrollTo({
        top: hotelRef.current.offsetTop,
        behavior: "smooth",
      });

    if (select.includes("long") || select.includes("student"))
      return window.scrollTo({
        top: articleRef.current.offsetTop,
        behavior: "smooth",
      });

    //eslint-disable-next-line
  }, [select]);

  const changeHeight = () => {
    const width = window.innerWidth;
    if (width <= 900) setHeight("81px");
    if (width > 900 && width <= 1101) setHeight("99px");
  };

  const changeList = (currentList) => {
    const init = list.filter(
      (l) => l.title.toLocaleLowerCase() === currentList
    );

    setData(init);
    setCurrent(currentList);
    setVideo({ playVideo: false, videoId: "" });
  };

  const listStyle = (desc) => {
    if (desc.toLocaleLowerCase() === current) {
      return {
        background: "#FF889E",
      };
    }
  };

  const onReady = (e) => {
    e.target.playVideo();
  };

  const playVideo = ({ videoId }) => {
    const newVideo = { ...video };
    newVideo.playVideo = true;
    newVideo.videoId = videoId;

    setVideo(newVideo);
  };

  const closeVideo = () => {
    const newVideo = { ...video };
    newVideo.playVideo = false;
    newVideo.videoId = "";

    setVideo(newVideo);
  };

  const closeList = () => {
    setData([]);
    setCurrent("");
  };

  const opts = {
    width: "100%",
    height: "380px",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleSelect = () => {
    setShowList(!showList);
  };

  const handleList = (e) => {
    setSelect(e.target.innerText);
    setShowList(false);
  };

  return (
    <section className={banner.container}>
      <div className={banner.banner}>
        <div className={banner.nav}>
          <li>
            Landing page
            <IconContext.Provider value={{ className: "banner-arrow" }}>
              <IoMdArrowDropright />
            </IconContext.Provider>
          </li>
          <li>
            Helsinki
            <IconContext.Provider value={{ className: "banner-arrow" }}>
              <IoMdArrowDropright />
            </IconContext.Provider>
          </li>
          <li>Accomodation</li>
        </div>

        <div className={banner.center}>
          <header className={banner.bheader}>
            <p>Accomodation in Helsinki</p>
            <p>Explore different kinds of information</p>
          </header>

          <Link to="/city" className={banner.link}>
            <button>Join us</button>
          </Link>

          <div className={banner.selectperson}>
            <span>I am a</span>
            <span>
              <input
                type="text"
                placeholder="Person who will stay for a long term"
                value={select}
                readOnly={true}
                onClick={handleSelect}
              />

              <IconContext.Provider
                value={{
                  className: "arrowDown",
                  style: { transform: showList && "rotate(180deg)" },
                }}
              >
                <IoIosArrowDown />
              </IconContext.Provider>

              <nav style={{ height: showList && height }}>
                <ul>
                  <li onClick={handleList}>
                    Person who will stay for a long term
                  </li>
                  <li onClick={handleList}>
                    Person who will stay for a short term
                  </li>
                  <li onClick={handleList}>Person who is a student</li>
                </ul>
              </nav>
            </span>
          </div>
        </div>
      </div>

      <div className={banner.list}>
        <div
          className={banner.listflex}
          onMouseOver={() => changeList("visa issue")}
          style={listStyle("visa issue")}
        >
          <span>
            <IconContext.Provider value={{ className: "list-icon globe" }}>
              <VscGlobe />
            </IconContext.Provider>
          </span>
          <span>Visa issue</span>
        </div>
        <div
          className={banner.listflex}
          onMouseOver={() => changeList("atm")}
          style={listStyle("atm")}
        >
          <span>
            <IconContext.Provider value={{ className: "list-icon" }}>
              <BiDollarCircle />
            </IconContext.Provider>
          </span>
          <span>Visa issue</span>
        </div>
        <div
          className={banner.listflex}
          onMouseOver={() => changeList("top hotels")}
          style={listStyle("top hotels")}
        >
          <span>
            <IconContext.Provider value={{ className: "list-icon" }}>
              <RiHotelLine />
            </IconContext.Provider>
          </span>
          <span>Top hotels</span>
        </div>
        <div
          className={banner.listflex}
          onMouseOver={() => changeList("security risk")}
          style={listStyle("security risk")}
        >
          <span>
            <IconContext.Provider value={{ className: "list-icon" }}>
              <SiAdguard />
            </IconContext.Provider>
          </span>
          <span>Security risk</span>
        </div>
      </div>

      {video.playVideo && (
        // Not sure
        <div className={`${banner.video} ${banner.bannervideo}`}>
          <span onClick={closeVideo}>
            <IconContext.Provider value={{ className: "icon" }}>
              <AiOutlineCloseCircle />
            </IconContext.Provider>
          </span>
          <Youtube videoId={video.videoId} opts={opts} onReady={onReady} />
        </div>
      )}

      {!video.playVideo && (
        <div className={banner.listitem}>
          {data.map((d) => (
            <React.Fragment key={d.id}>
              <div className={banner.listleft}>
                <img src={d.imgPath} alt="helsinki" id="list" />
                <div className={banner.listdesc}>
                  <div className={banner.listVid} onClick={() => playVideo(d)}>
                    <img src={playButton} alt="playButton" id="listVid" />
                  </div>
                  <p>Accomodation in Helsinki</p>
                </div>

                <IconContext.Provider value={{ className: "forward" }}>
                  <RiShareForwardBoxFill />
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
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud.
                  </p>

                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore.
                  </p>
                </div>

                <div className={banner.listmore}>
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
                    <IconContext.Provider value={{ className: "icon share" }}>
                      <SiSkillshare />
                    </IconContext.Provider>
                  </p>
                </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </section>
  );
}

export default Banner;
