import React, { useEffect, useState, useContext } from "react";
import { FaPlayCircle } from "react-icons/fa";
import Icon from "../../../components/TravelBlog/icon/Icon";
import Center from "../../../components/TravelBlog/center/Center";
import Flex from "../../../components/TravelBlog/flex/Flex";
import Menu from "../Menu/Menu";

import useModal from "../GetStarted/useModal";
import GetStartedModal from "../GetStarted/GetStartedModal";
import { multiStepContext } from "../GetStarted/StepContext";
import header from "./Header.module.css";
import video from "../../../assets/TravelBlog/vid.mp4";

//initial variable for multi-step modals // connected to GetStartedModal file
export const steps = [
  {
    description: `About your \n desired topic`,
    completed: false,
    selected: true,
    highlighted: true,
  },
  {
    description: "About you",
    completed: false,
    selected: false,
    highlighted: false,
  },
  {
    description: `About your \n blog plan`,
    completed: false,
    selected: false,
    highlighted: false,
  },
];

function BlogBanner() {
  //for toggling the modal
  const { isShowing, toggle } = useModal();

  const [smallScreen, setSmallScreen] = useState(false);
  const myContext = useContext(multiStepContext);

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
                  <button onClick={toggle}>Get statarted</button>
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
              <button onClick={toggle}>Get statarted</button>
            </div>
          )}
        </Flex>
      </Center>
      <GetStartedModal
        isShowing={isShowing}
        hide={toggle}
        steps={steps}
        currentStep={myContext.currentStepNumber}
      />
    </div>
  );
}

export default BlogBanner;
