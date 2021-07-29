import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";
import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import { RiArrowDropDownFill } from "react-icons/ri";
import { FiMenu } from "react-icons/fi";
import { ReactComponent as Logo } from "../../../../assets/Section/Header/Logo.svg";
import WeatherIcon from "../../../../assets/Section/Header/weather-icon.svg";
import { GetWindowDimension } from "../../../../utils/GetWindowDimension";
import NavigationMobile from "./NavigationMobile";
import axios from "axios";
import { apiKey, cityID } from "../../../../constants/index";
import { animated, useSpring } from "react-spring";
import DestinationIcon from "../../../../assets/Nav/DestinationIcon.svg";
import ServicesIcon from "../../../../assets/Nav/ServicesIcon.svg";
import CareerIcon from "../../../../assets/Nav/CareerIcon.svg";
import PricingIcon from "../../../../assets/Nav/PricingIcon.svg";
import GLOBUZZER from "../../../../assets/Logo.svg";
import { oldSections } from "../SearchBar/oldSections";
import { firestore } from "../../../../utils/firebase.utils";

const NavBar = ({ pathname }) => {
  const { width, height } = GetWindowDimension();
  const [scroll, setScroll] = useState(false);
  const [weather, setWeather] = useState("");
  const [visited, setVisited] = useState(JSON.parse(localStorage.getItem('visited')) || []);
  const [isOpen, setIsOpen] = useState(false);
  const [currentCity, setCurrentCity] = useState(null);

  const loginPath = pathname === '/' 
    ? "https://globuzzer.mn.co/sign_in" 
    : `https://globuzzer.mn.co/sign_in?from=https%3A%2F%2Fglobuzzer.mn.co%2FgroupsC5389%3Fautojoin%3D1&space_id=${oldSections[pathname.replace('/', '').toLowerCase()]}`;

    const signupPath = `https://globuzzer.mn.co/sign_up?from=https%3A%2F%2Fglobuzzer.mn.co%2FgroupsC5389%3Fautojoin%3D1&space_id=${oldSections[pathname.replace('/', '')]}`;

  const handleScroll = () => {
    if (window.pageYOffset > 60) return setScroll(true);
    setScroll(false);
  };

  const recentVisited = (array, item, length) => {
      // let unique = [...new Set(array)];
      let transform = []
      if (item !== '/' && Object.keys(oldSections).includes(item.replace('/','').toLowerCase())) {
          transform = array.unshift(item) > length ? array.pop() : null;
      }
      let unique = [...new Set(transform)];
      return unique;
    };
    
  useEffect(() => {
    const unsubscribe = firestore
      .collection("section_live")
      .orderBy("name")
      .onSnapshot((snapshot) => {
        const newCity = snapshot.docs.map((doc) => ({
          // id: doc.id,
          // ...doc.data(),
          ...doc.data()
        }));
        // setCollection(newCity);
        setCurrentCity(newCity.filter((c) => c.name.toLowerCase() === pathname.replace('/', '').toLowerCase())[0]);
      });
      return () => unsubscribe();
  }, [pathname]);

  useEffect(() => {
    recentVisited(visited, pathname, 3);
    localStorage.setItem("visited",JSON.stringify([...new Set(visited)]))
  },[pathname]);

  const currentTemp = () => {
    let key = apiKey;
    let id = cityID;
    const temperature = document.querySelector("#temp");
    if (temperature) {
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/weather?id=" +
            id +
            "&appid=" +
            key +
            "&units=metric"
        )
        .then((data) => {
          const temp = Math.ceil(data.data.main.temp);
          setWeather(temp);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    currentTemp();
    // checkCityHandler();
    window.addEventListener("scroll", handleScroll);
  }, []);

  const navStyle = () => {
    if (scroll) {
      return {
        backgroundColor: "rgba(128, 128, 128, 0.6)",
        scrollBehavior:"smooth"
      };
    }
  };

  const animation = useSpring({
    height: isOpen ? `${height}px` : "0px",
    opacity: isOpen ? 1 : 0,
    width: isOpen ? "213px" : "0px",
    backgroundColor: "#2A293A",
    position: "absolute",
    top: 0,
    right: 0,
    zIndex: 9999,
    pointerEvents: isOpen ? "auto" : "none",
    display: "flex",
    flexDirection: "column",
    config: {
      duration: isOpen ? 100 : 150,
    },
  });

  const DesktopNav = () => (
    <div className={styles.nav} style={navStyle()}>
      <Link to="/">
        <p className={styles.logoContainer}>
          <Logo className={styles.logo} />
        </p>
      </Link>
      <div className={styles.right}>
        <li className={styles.dest}>
          Destinations
          <IconContext.Provider value={{ className: "dropdown" }}>
            <RiArrowDropDownFill />
          </IconContext.Provider>
          <nav className={styles.destination}>
            <ul>
              <p className={styles.recently}>Recently:</p>
              {[...new Set(visited)].map((city) => {
                const recent = city.replace('/', '');
                if (recent !== '') {
                  return (
                    <Link to={city}>
                      <li>{recent}</li>
                    </Link>
                  )
                }
              })}
            </ul>

            <ul>
              <p>All destinations:</p>
            </ul>
            <ul>
              {Object.keys(oldSections).slice(0, 4).map((section) => (
                <Link to={`/${section}`}>
                  <li>{section}</li>
                </Link>
              ))}
            </ul>
            <ul>
              {Object.keys(oldSections).slice(5, 9).map((section) => (
                <Link to={`/${section}`}>
                  <li>{section}</li>
                </Link>
              ))}
            </ul>
            <ul>
              {Object.keys(oldSections).slice(10, 14).map((section) => (
                <Link to={`/${section}`}>
                  <li>{section}</li>
                </Link>
              ))}
            </ul>
            <ul>
              {Object.keys(oldSections).slice(15, 19).map((section) => (
                <Link to={`/${section}`}>
                  <li>{section}</li>
                </Link>
              ))}
            </ul>
            <ul>
              {Object.keys(oldSections).slice(20, 24).map((section) => (
                <Link to={`/${section}`}>
                  <li>{section}</li>
                </Link>
              ))}
            </ul>
            <ul>
              {Object.keys(oldSections).slice(25, 29).map((section) => (
                <Link to={`/${section}`}>
                  <li>{section}</li>
                </Link>
              ))}
            </ul>
          </nav>
        </li>

        {/* <li className={styles.service}>
          Services
          <IconContext.Provider value={{ className: "dropdown" }}>
            <RiArrowDropDownFill />
          </IconContext.Provider>
          <nav className={styles.destination}>
            <ul>
              <div>
                <IconContext.Provider value={{ className: "bs-search" }}>
                  <BsSearch className={styles.search} />
                </IconContext.Provider>
                <input type="text" placeholder="Search for services here..." />
              </div>

              <p className={styles.recently}>Recently:</p>
              <li>Flight</li>
              <li>Hotel</li>
            </ul>

            <ul>
              <p>All services:</p>
            </ul>

            <ul>
              <li>Event</li>
              <li>Restaurant</li>
            </ul>

            <ul>
              <li>Transportation</li>
              <li>Job</li>
              <li>Flight</li>
            </ul>
          </nav>
        </li> */}

        <li className={styles.topic}>
          Topics
          <IconContext.Provider value={{ className: "dropdown" }}>
            <RiArrowDropDownFill />
          </IconContext.Provider>
          <nav className={styles.destination}>
            <ul>
              <p className={styles.recently}>Recently:</p>
              <li>Rome</li>
              <li>Stockholm</li>
            </ul>

            <ul>
              <p>All topics:</p>
            </ul>
              {currentCity && (
              <>
                <ul>
                  {currentCity.topics.slice(0, 4).map((topic) => (
                    <Link to="#">
                      <li>{topic.text}</li>
                    </Link>
                  ))}
                </ul>
    
                <ul>
                  {currentCity.topics.slice(5, 9).map((topic) => (
                    <Link to="#">
                      <li>{topic.text}</li>
                    </Link>
                  ))}
                </ul>
    
                <ul>
                  {currentCity.topics.slice(10, 14).map((topic) => (
                    <Link to="#">
                      <li>{topic.text}</li>
                    </Link>
                  ))}
                </ul>
    
                <ul>
                  {currentCity.topics.slice(15, 19).map((topic) => (
                    <Link to="#">
                      <li>{topic.text}</li>
                    </Link>
                  ))}
                </ul>
    
                <ul>
                  {currentCity.topics.slice(20, 24).map((topic) => (
                    <Link to="#">
                      <li>{topic.text}</li>
                    </Link>
                  ))}
                </ul>
              </>
              )} 
          </nav>
        </li>

        <Link to="/pricing" className="navigation_link" id="link_pricing">
          Pricing
        </Link>
      </div>
      <div className={styles.option}>
        <button className={styles.ownCityBtn}>Own your own city section</button>
      </div>

      <div className={styles.options} >
        <div className={styles.optionItems}>
          <img src={WeatherIcon} alt="weather" className={styles.weatherIcon} />
          <span className={styles.weatherText}>
            <p className={styles.temperature} id="temp">
              {weather}
            </p>
            <p>&#8451;</p>
          </span>

          <div className={styles.loginBtn}>
          <a
          type="button"
          className="navigation_button"
          id="button_login"
          href={loginPath}
        >
          Login
        </a>
          </div>
          {pathname === '/' ? (
            <Link to='/signup'>
              <button className={styles.signUpBtn}>Sign Up</button>
            </Link>
          ) : (
            <a 
              href={signupPath}
            >
              <button className={styles.signUpBtn}>Sign Up</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );

// -------------------------------
  const NavMobileMenu = () => (
    <div style={{ display: "flex" }}>
      {isOpen && (
        <div
          onKeyDown={() => {}}
          tabIndex={0}
          role="button"
          style={{
            backgroundColor: "transparent",
            width: "100vw",
            height: "100vh",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 9999,
            color: "transparent",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          Test
        </div>
      )}
      <animated.div style={animation} className="navigation_mobile_menu">
        <div className="nav_top">
          <HashLink className="nav_item" to="/#section_newcity" smooth>
            <img src={DestinationIcon} alt="nav_icon" className="nav_icon" />
            Destination
          </HashLink>
          <HashLink className="nav_item" to="/#aux_services" smooth>
            <img src={ServicesIcon} alt="nav_icon" className="nav_icon" />
            Services
          </HashLink>

          <HashLink className="nav_item" to="/pricing">
            <img src={PricingIcon} alt="nav_icon" className="nav_icon" />
            Pricing
          </HashLink>
          <a href="http://skillscanner.globuzzer.com/" className="nav_item">
            <img src={CareerIcon} alt="nav_icon" className="nav_icon" />
            Career
          </a>
        </div>
        <div className="nav_bottom">
          <a
            href="https://globuzzer.com/travel-blog.php"
            className="nav_mobile_own"
          >
            Create your travel blog
          </a>
          <div className="nav_bottom_container">
            <a
              type="button"
              className="nav_mob_link"
              href={loginPath}
            >
              Login
            </a>
            <button type="button" className="nav_mob_link" id="mob_sign">
              {pathname === '/' ? (
                <Link to="/signup" className="nav_mob_link">
                  Sign up
                </Link>
              ) : (
                <a href={signupPath} className="nav_mob_link">
                  Sign up
                </a>
              )}
            </button>
          </div>
        </div>
      </animated.div>
    </div>
  );
  const NavMobile = () => (
    <section className="section_navigation">
      <Link to="/">
        <img src={GLOBUZZER} alt="logo" />
      </Link>
      <FiMenu
        className="mobile_hamburger_menu"
        onClick={() => setIsOpen(!isOpen)}
      />
      <NavMobileMenu />
    </section>
  );
// ----------------------------

  return <>{width > 1100 ? <DesktopNav /> : <NavMobile />}</>;
};

export default NavBar;
