import React, { useState, useEffect, useContext } from "react";
import _ from "lodash";
import like from "../../../../src/assets/Topic/like.png";
import { IconContext } from "react-icons";
import { TiArrowSortedDown } from "react-icons/ti";
import { IoIosArrowDown } from "react-icons/io";
import { sliceData } from "../../../utils/sliceData";
import styles from "./hotels.module.css";
import { hotelRefContext } from "../../../contexts/Refs";
import AmadeusService from "../../../service/amadeus/AmadeusService";
import moment from "moment";
import Vimeo from "../../Vimeo/Vimeo";
import BlogHeader from "../../SectionHeader/BlogHeader";
import LazyLoad from "react-lazyload";
import Spinner from '../../Spinner/Spinner';

function Hotels({ topic }) {
  const { hotel } = topic

  const [select, setSelect] = useState("");
  const [showList, setShowList] = useState(false);
  const [tabletSize, setTabletSize] = useState(false);
  const [hotelSize, setHotelSize] = useState();

  const [hotel2, setHotel2] = useState([]);

  const hotelRef = useContext(hotelRefContext);

  const [hotelParams, setHotelParams] = useState({
    cityCode: '',
    checkInDate: '',
    checkOutDate: '',
    numberOfGuest: 0
  })

  console.log('Q', topic)

  useEffect(() => {
    setHotelParams({ ...hotelParams, cityCode: topic.IATA_code })
  }, [topic]);

  useEffect(() => {
    AmadeusService
      .searchHotels(hotelParams.cityCode)
      .then(res => setHotel2(res.data))
      .catch(err => console.error(err))
  }, [hotelParams])

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

    if (price < 100) string = string.repeat(2);
    if (price >= 100 && price < 500) string = string.repeat(3);
    if (price >= 500) string = string.repeat(4);

    return string;
  };

  const handleSelect = () => {
    setShowList(!showList);
  };

  const handleList = (e) => {
    const value = e.target.innerText
    setSelect(value);
    setHotelParams({ ...hotelParams, numberOfGuest: Number(value) ? Number(value) : 3 })
    setShowList(false);
  };

  const handleChange = e => {
    const { name, value } = e.target;

    setHotelParams({ ...hotelParams, [name]: value })
  }

  const findHotels = () => {
    setHotel2([]);
    AmadeusService
      .findHotels(hotelParams)
      .then(res => setHotel2(res.data))
      .catch(err => console.error(err))

  }

  console.log(hotelParams)

  return (
    <section className={styles.container} ref={hotelRef}>
      <BlogHeader label='Find suitable hotels' />

      <div className={styles.check}>
        <div>
          <input type="date" placeholder="Check-in" name='checkInDate' min={moment(new Date()).format('yyyy-MM-DD')} onChange={handleChange} />
        </div>

        <div>
          <input type="date" placeholder="515Check-out" name='checkOutDate' min={moment(new Date() + 1).format('yyyy-MM-DD')} onChange={handleChange} />
        </div>

        <div>
          <span>
            <input
              type="text"
              placeholder="Number of guests"
              name='numberOfGuest'
              value={select}
              readOnly={true}
              onClick={handleSelect}
              onChange={handleChange}
            />

            <nav style={{ height: showList && "89px" }}>
              <ul>
                <li onClick={handleList}>1</li>
                <li onClick={handleList}>2</li>
                <li onClick={handleList}>3</li>
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

        <div>
          <button onClick={findHotels}>Search Hotel</button>
        </div>
      </div>

      <div className={styles.hotelflex}>
        {hotel2.length > 0 ?
          <div className={styles.hotelist}>
            {hotel2 && hotel2.map((d) => (
              <div className={styles.hotelitems} key={d.hotel.hotelId}>
                <div className={styles.hoteleft}>
                  <img src={d.hotel.media ? d.hotel.media[0].uri : 'https://firebasestorage.googleapis.com/v0/b/admin-project-9c459.appspot.com/o/topic%2Faccomodation%2Fscandic.png?alt=media&token=c8c3febc-26eb-423e-994e-1d032cb32bc2'} alt={d.hotel.name} />
                  {d.recommended && <p>{d.recommended}</p>}
                </div>
                <div className={styles.hotelright}>
                  <header>{d.hotel.name}</header>

                  <div className={styles.rightp}>
                    <p>{d.hotel.hotelDistance.distance} km from city center</p>
                    <p>Price: {hotelPrice(d.offers[0].price.total)}</p>
                    <p>
                      {" "}
                      {_.range(d.hotel.rating).map((r) => (
                        <img src={like} alt="like" key={r} />
                      ))}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          :
          <div className={styles.spinner}>
            <LazyLoad>
              <Spinner />
            </LazyLoad>
          </div>
        }

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
          <Vimeo city={topic} />
        </div>

        {/* <div className={styles.vimeo}>
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
        </div> */}
      </div>
    </section>
  );
}

export default Hotels;
