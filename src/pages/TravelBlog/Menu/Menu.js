import React, { Fragment, useEffect, useState, useContext } from "react";
import { FaBars } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { RiCloseLine } from "react-icons/ri";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { FooterContext, BloggerContext } from "../contexts/refContext";
import logo from "../../../assets/TravelBlog/globuzz_logo.svg";
import logoSmall from "../../../assets/TravelBlog/globe_logo.svg";
import Icon from "../../../components/TravelBlog/icon/Icon";

import useModal from "../GetStarted/useModal";
import GetStartedModal from "../GetStarted/GetStartedModal";
import { multiStepContext } from "../GetStarted/StepContext";

import menu from "./Menu.module.css";

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

function Menu() {
  // const { currentStepNumber } = useContext(multiStepContext);
  //for toggling the modal
  const { isShowing, toggle } = useModal();

  const [smallScreen, setSmallScreen] = useState(false);
  const [scroll, setScroll] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);

  const footerRef = useContext(FooterContext);
  const bloggerRef = useContext(BloggerContext);

  useEffect(() => {
    window.addEventListener("resize", checkScreen);
    window.addEventListener("scroll", checkScroll);
    checkScreen();

    return () => {
      window.removeEventListener("resize", checkScreen);
      window.removeEventListener("scroll", checkScroll);
    };
  }, []);

  const checkScreen = () => {
    window.innerWidth <= 755 ? setSmallScreen(true) : setSmallScreen(false);
  };

  const checkScroll = () => {
    window.pageYOffset > 0 ? setScroll(true) : setScroll(false);
  };

  const goToRef = (sectionRef) => {
    window.scrollTo({ top: sectionRef.current.offsetTop });
  };

  const navStyle = () => {
    if (scroll) {
      return {
        position: "fixed",
        width: "100%",
        background: "rgba(0, 0, 0, 0.3)",
        zIndex: "2",
      };
    }
  };

  return (
    <Fragment>
      <nav className={menu.mainMenu} style={navStyle()}>
        <ul className={`${menu.menuItems} ${menu.menuLeft}`}>
          <li className={menu.menuList}>
            {smallScreen ? (
              <span onClick={() => setSideMenu(true)}>
                <Icon label={<FaBars />} />
              </span>
            ) : (
              <img src={logo} alt="logo" />
            )}
          </li>
        </ul>

        {smallScreen && (
          <ul className={`${menu.menuItems} ${menu.menuCenter}`}>
            <li className={menu.menuList}>
              <img src={logoSmall} alt="logoSmall" />
            </li>
          </ul>
        )}

        <ul className={`${menu.menuItems} ${menu.menuRight}`}>
          {!smallScreen && (
            <Fragment>
              <li className={menu.menuList} onClick={() => goToRef(bloggerRef)}>
                Testimonials
              </li>
              <li className={menu.menuList} onClick={() => goToRef(footerRef)}>
                Contact us
              </li>
            </Fragment>
          )}

          {/* <li className={menu.menuList}>Get started</li> */}
          <li
            onClick={toggle}
            className={menu.menuList}
            style={{ background: scroll && "#f24b6a", color: scroll && "#fff" }}
          >
            Get started
          </li>
        </ul>
      </nav>
      <GetStartedModal
        isShowing={isShowing}
        hide={toggle}
        steps={steps}
        // currentStep={currentStepNumber}
      />

      <nav className={menu.sideMenu} style={{ left: sideMenu && "0px" }}>
        <ul className={`${menu.sideItems} ${menu.sideLeft}`}>
          <li className={menu.sideList}>
            <span>globuzzer</span>
            <span onClick={() => setSideMenu(false)}>
              <Icon label={<RiCloseLine />} />
            </span>
          </li>
          <li className={menu.sideList}>
            <span>
              <Icon label={<FiMapPin />} />
            </span>
            <span>Testimonials</span>
          </li>
          <li className={menu.sideList}>
            <span>
              <Icon label={<AiOutlineQuestionCircle />} />
            </span>
            <span>Contact us</span>
          </li>
        </ul>

        <ul className={`${menu.sideItems} ${menu.sideRight}`}>
          <li
            className={menu.sideList}
            onClick={toggle}
            style={{ background: scroll && "#f24b6a" }}
          >
            Get started
          </li>
        </ul>
      </nav>
    </Fragment>
  );
}

export default Menu;
