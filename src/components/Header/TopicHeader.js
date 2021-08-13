import React, { useContext, useEffect, useState } from 'react'
import header from "./header.module.css";
import { IconContext } from "react-icons";
import {
  IoMdArrowDropright,
  IoIosArrowDown,
} from "react-icons/io";
import { Link } from 'react-router-dom';
import { articleRefContext, hotelRefContext } from '../../contexts/Refs';

const TopicHeader = ({ topics, topicName }) => {

  const { mainImg, title, subtitle, city } = topics;

  const [select, setSelect] = useState('');
  const [showList, setShowList] = useState(false);
  const [height, setHeight] = useState("125px");

  const hotelRef = useContext(hotelRefContext);
  const articleRef = useContext(articleRefContext);

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

  useEffect(() => {
    changeHeight();
    window.addEventListener('resize', changeHeight);
  }, []);

  const changeHeight = () => {
    const width = window.innerWidth;
    if (width <= 900) setHeight("81px");
    if (width > 900 && width <= 1101) setHeight("99px");
  };

  const handleSelect = () => {
    setShowList(!showList);
  };

  const handleList = (e) => {
    setSelect(e.target.innerText);
    setShowList(false);
  };

  return (

    <section>
      <div
        style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${mainImg})` }}
        className={header.banner}
      >
        <div className={header.nav}>
          <Link to='/'>
            Landing page
            <IconContext.Provider value={{ className: "banner-arrow" }}>
              <IoMdArrowDropright className={header.bannerArrow} />
            </IconContext.Provider>
          </Link>
          <Link to={city && `/${city.toLocaleLowerCase()}`}>
            {city}
            <IconContext.Provider value={{ className: "banner-arrow" }}>
              <IoMdArrowDropright className={header.bannerArrow} />
            </IconContext.Provider>
          </Link>
          <li style={{ cursor: 'text' }}>{topicName}</li>
        </div>

        <div className={header.center}>
          <header className={header.bheader}>
            <p>{title && title.content}</p>
            <p>{subtitle && subtitle.content}</p>
          </header>

          <Link to='/signup'>
            <button>Join us</button>
          </Link>

          <div className={header.selectperson}>
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
                <IoIosArrowDown className={header.arrowDown} />
              </IconContext.Provider>

              <nav style={{ height: showList && height }}>
                <ul>
                  <li onClick={handleList}>
                    Person who will stay for a long term
                  </li>
                  <li onClick={handleList}>
                    Person who will stay for a short term
                  </li>
                  <li onClick={handleList}>
                    Person who is a student
                  </li>
                </ul>
              </nav>
            </span>

          </div>
        </div>
      </div>
    </section>

  )
}

export default TopicHeader
