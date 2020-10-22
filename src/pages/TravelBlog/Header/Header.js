import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import Icon from "../../../components/TravelBlog/icon/Icon";
import Center from "../../../components/TravelBlog/center/Center";
import Flex from "../../../components/TravelBlog/flex/Flex";
import Menu from "../Menu/Menu";
import header from "./Header.module.css";
import video from "../../../assets/TravelBlog/vid.mp4";

function BlogBanner() {
  const [smallScreen, setSmallScreen] = useState(false);

  useEffect(() => {
    window.addEventListener("resize", checkScreen);
    checkScreen();

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const checkScreen = () => {
    window.innerWidth <= 500 ? setSmallScreen(true) : setSmallScreen(false);
  };

  return (
    <div className={header.container}>
      <Menu />
      <Center>
        <Flex>
          <div className={header.left}>
            {!smallScreen ? (
              <header>Start your travel blog with globuzzer</header>
            ) : (
              <header>
                <p>start your travel</p>
                <p>website</p>
                <p>with globuzzer</p>
              </header>
            )}

            <p className={header.body}>
              Everything you need to begin sharing your travel experiences,
              reach a broader audience and gain profit
            </p>

            {!smallScreen && (
              <div className={header.items}>
                <div>
                  <button>Get statarted</button>
                </div>

                <div className={header.itemsRight}>
                  <Icon label={<FaPlayCircle />} />
                  <span>watch the demo</span>
                </div>
              </div>
            )}
          </div>
          <div className={header.right}>
            <video autoPlay loop>
              <source src={video} type="video/mp4" />
            </video>
          </div>

          {smallScreen && (
            <div className={header.btnSmall}>
              <button>Get statarted</button>
            </div>
          )}
        </Flex>
      </Center>
    </div>
  );
}

export default BlogBanner;
