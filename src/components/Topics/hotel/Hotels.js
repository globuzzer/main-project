import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import like from "../../../../src/assets/Topic/like.png";
import { IconContext } from "react-icons";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { sliceData } from "../sliceData";
import styles from "./hotels.module.css";
import { hotelRefContext } from "../../../contexts/Refs";

function Hotels({ topic }) {
  const { hotel, advertise } = topic

  const [select, setSelect] = useState("");
  const [showList, setShowList] = useState(false);
  const [tabletSize, setTabletSize] = useState(false);
  const [hotelSize, setHotelSize] = useState();

  const hotelRef = useContext(hotelRefContext);

  useEffect(() => {
    window.addEventListener("resize", changeHotelSize);

    if (window.innerWidth <= 515) {
      setHotelSize(5);
      setTabletSize(true);
    }
    // eslint-disable-next-line
  }, []);

  //slice hotel when screen is less than 769px
  const changeHotelSize = () => {
    if (window.innerWidth <= 515) {
      setHotelSize(5);
      setTabletSize(true);
      return;
    }
    setHotelSize(hotel && hotel.length);
    setTabletSize(false);
  };

  const hotelSliced = sliceData(hotel || [], 0, hotelSize);

  const hotelPrice = (price) => {
    let string = "€";

    if (price < 50) string = string.repeat(2);
    if (price >= 50 && price < 80) string = string.repeat(3);
    if (price >= 80) string = string.repeat(4);

    return string;
  };

  const handleSelect = () => {
    setShowList(!showList);
  };

  const handleList = (e) => {
    setSelect(e.target.innerText);
    setShowList(false);
  };

  return (
    <section className={styles.hotel} ref={hotelRef}>
      <header className={styles.header}>
        {window.innerWidth <= 515 ? "Hotels & hostels" : "Find suitable hotels"}
        <div className={styles.underline}></div>
      </header>

      <div className={styles.check}>
        <div>
          <input type="date" placeholder="Check-in" />
        </div>

        <div>
          <input type="date" placeholder="515Check-out" />
        </div>

        <div>
          <span>
            <input
              type="text"
              placeholder="Number of guests"
              value={select}
              readOnly={true}
              onClick={handleSelect}
            />

            <nav style={{ height: showList && "89px" }}>
              <ul>
                <li onClick={handleList}>1</li>
                <li onClick={handleList}>2</li>
                <li onClick={handleList}>3+</li>
              </ul>
            </nav>
          </span>

          <p className={styles.formselect}>
            <IconContext.Provider
              value={{
                className: "dropIcon",
                style: { transform: showList && "rotate(180deg)" },
              }}
            >
              <TiArrowSortedDown className={styles.dropIcon} />
            </IconContext.Provider>
          </p>
        </div>
      </div>

      <div className={styles.hotelflex}>
        <div className={styles.hotelist}>
          {hotelSliced.map((d) => (
            <div className={styles.hotelitems} key={d.id}>
              <div className={styles.hoteleft}>
                <img src={d.img} alt={d.title} />
                {d.recommended && <p>{d.recommended}</p>}
              </div>
              <div className={styles.hotelright}>
                <header>{d.title}</header>

                <div className={styles.rightp}>
                  <p>{d.distance} km from city center</p>
                  <p>Price: {hotelPrice(d.price)}</p>
                  <p>
                    {" "}
                    {_.range(d.rating).map((r) => (
                      <img src={like} alt="like" key={r} />
                    ))}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* shows only when screen is in tablet and mobile devices */}
        {tabletSize && (
          <div className={styles.morehotel} onClick={() => setHotelSize(hotel.length)}>
            see more
            <IconContext.Provider
              value={{
                className: "hotel-arrow",
              }}
            >
              <IoIosArrowDown />
            </IconContext.Provider>
          </div>
        )}

        <div className={styles.vimeo}>
          {advertise &&
            <div
              className={styles.content}
              style={advertise.style ? { backgroundColor: advertise.style.backgroundColor } : undefined}
            >
              <header className={styles.vimeohead}>
                <img src={advertise.logo} alt='logo' style={{ width: 80 }} />
              </header>

              <div className={styles.vimeop}>
                <p>{advertise.text1}</p>

                <p>{advertise.text2}</p>
              </div>

              <div className={styles.vimeobtn}>
                <a href={advertise.link} target='_blank'>
                  <button
                    style={advertise.style ? { backgroundColor: advertise.style.buttonColor } : undefined}
                  >
                    Learn more
                  </button>
                </a>
              </div>
            </div>
          }
        </div>
      </div>
    </section>
  );
}

export default Hotels;
