import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import like from "../images/like.png";
import { IconContext } from "react-icons";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { hotels } from "../../../utils/data";
import { sliceData } from "../../../utils/sliceData";
import "./hotels.css";
import { hotelRefContext } from "../../../contexts/refs";

function Hotels() {
  const [data] = useState(hotels);
  const [select, setSelect] = useState("");
  const [showList, setShowList] = useState(false);
  const [tabletSize, setTabletSize] = useState(false);
  const [hotelSize, setHotelSize] = useState(data.length);

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
    setHotelSize(data.length);
    setTabletSize(false);
  };

  const hotelSliced = sliceData(data, 0, hotelSize);

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
    <section className="hotel" ref={hotelRef}>
      <header className="hotel-header">
        {window.innerWidth <= 515 ? "Hotels & hostels" : "find suitable hotels"}
        <div className="underline"></div>
      </header>

      <div className="check">
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

          <p className="form-select">
            <IconContext.Provider
              value={{
                className: "dropIcon",
                style: { transform: showList && "rotate(180deg)" },
              }}
            >
              <TiArrowSortedDown />
            </IconContext.Provider>
          </p>
        </div>
      </div>

      <div className="hotel-flex">
        <div className="hotel-list">
          {hotelSliced.map((d) => (
            <div className="hotel-items" key={d.id}>
              <div className="hotel-left">
                <img src={d.img} alt={d.title} />
                {d.recommended && <p>{d.recommended}</p>}
              </div>
              <div className="hotel-right">
                <header>{d.title}</header>

                <div className="right-p">
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
          <div className="more-hotel" onClick={() => setHotelSize(data.length)}>
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

        <div className="vimeo">
          <div className="vimeo-content">
            <header className="vimeo-header">Vimeo</header>

            <div className="vimeo-p">
              <p>customisable player</p>

              <p>a vimeo feature</p>
            </div>

            <div className="vimeo-btn">
              <button>Learn more</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hotels;
