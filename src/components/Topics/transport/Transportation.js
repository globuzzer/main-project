import React, { useEffect, useRef, useState } from 'react';
import BlogHeader from '../../SectionHeader/BlogHeader';
import styles from './transport.module.css';
import PlaceAutoComplete from '../../AutoComplete/PlaceAutoComplete';
import moment from 'moment';
import { IconContext } from "react-icons";
import { TiArrowSortedDown } from "react-icons/ti";
import { MdCancel } from 'react-icons/md';
import { VscLoading } from 'react-icons/vsc';
import logo from '../../../assets/GLOBUZZER.svg';
import AmadeusService from '../../../service/amadeus/AmadeusService';
import Vimeo from '../../Vimeo/Vimeo';
import { sliceData } from '../../../utils/sliceData';

const Transportation = ({ topic }) => {
  const ref = useRef()

  const [flights, setFlights] = useState([]);
  const [flightParams, setFlightParams] = useState({
    originLocationCode: '',
    destinationLocationCode: '',
    departureDate: '',
    adults: ''
  });

  const [place, setPlace] = useState('')

  const [isSearching, setIsSearching] = useState(false);
  const [flightSize, setFlightSize] = useState(4);
  const [showList, setShowList] = useState(false);

  const [otherTransports, setOtherTransports] = useState([]);

  useEffect(() => {
    setFlightParams({ ...flightParams, originLocationCode: topic.IATA_code })
    setOtherTransports(topic.otherTransport)
  }, [topic]);

  //test css
  useEffect(() => {
    setFlightParams({
      adults: 2,
      departureDate: "2021-11-06",
      destinationLocationCode: "HAJ",
      originLocationCode: "HEL",
    })
  }, []);

  useEffect(() => {
    setIsSearching(true);
    searchFlights();
  }, [flightParams])

  const handleSelect = (e) => {
    setShowList(!showList);
  }

  const handleChange = e => {
    const { name, value } = e.target;
    setFlightParams({ ...flightParams, [name]: value })
  };

  const handleList = e => {
    setShowList(false)
    setFlightParams({ ...flightParams, adults: e.target.value })
  };

  //flght functions
  const searchFlights = () => {
    setIsSearching(true);
    AmadeusService
      .searchFlights(flightParams)
      .then(res => setFlights(res.data))
      .catch(err => console.error(err))
  }

  const calculateDuration = (arrival, departure) => {
    const diffTimeByMls = moment(arrival).valueOf() - moment(departure).valueOf();
    const diffTimeByMins = moment.duration(diffTimeByMls).asMinutes();
    const hoursDuration = Math.floor(diffTimeByMins / 60);
    const minutesDuration = (diffTimeByMins - hoursDuration * 60);

    return `${hoursDuration}hour ${minutesDuration}minutes`;
  }

  const cancelSearch = () => {
    setIsSearching(false);
    setPlace('');
    setFlights([]);

    setFlightParams({
      originLocationCode: '',
      destinationLocationCode: '',
      departureDate: '',
      adults: ''
    })
  }

  //to limit the number of fligh displayed
  const slicedData = sliceData(flights, 0, flightSize)

  console.log(flightParams)

  return (
    <section className={styles.container}>
      <BlogHeader label='Find suitable flight' />

      <div className={styles.check}>
        <div>
          <PlaceAutoComplete
            place={place}
            setPlace={setPlace}
            flightParams={flightParams}
            setFlightParams={setFlightParams}
            styles={{ display: 'flex', flexDirection: 'column', width: 250, textAlign: 'left', paddingLeft: '2rem' }}
          />
        </div>

        <div>
          <input
            type='text' placeholder='Date'
            ref={ref}
            onFocus={() => (ref.current.type = "date")}
            onBlur={() => (ref.current.type = "text")}
            value={flightParams.departureDate}
            name='departureDate'
            min={moment(new Date()).format('yyyy-MM-DD')}
            onChange={handleChange}
          />
        </div>

        <div>
          <span>
            <input
              type="text"
              placeholder="Number of guests"
              readOnly={true}
              value={flightParams.adults}
              onClick={handleSelect}
              name='adults'
              onChange={handleChange}
            />

            <nav style={{ height: showList && "100px" }}>
              <ul>
                <li onClick={handleList} value={1}>1</li>
                <li onClick={handleList} value={2}>2</li>
                <li onClick={handleList} value={3}>3+</li>
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
              <TiArrowSortedDown color='white' style={{ marginTop: 10 }} />
            </IconContext.Provider>
          </p>
        </div>

        <div>
          <button onClick={searchFlights}>Search Flight</button>
        </div>

        {isSearching &&
          <div>
            <MdCancel className={styles.cancelIcon} onClick={cancelSearch} />
          </div>
        }
      </div>

      {/* list of flights come here */}
      {isSearching &&
        <div className={styles.flightFlex}>
          {flights.length > 0 ?
            <div className={styles.flightList}>
              {flights && slicedData.map(f => (
                <div className={styles.flightItems} style={{ padding: 20 }} key={f.id}>
                  <div className={styles.flightLeft}>
                    <img src={`https://daisycon.io/images/airline/?width=300&height=150&color=ffffff&iata=${f.validatingAirlineCodes}`} alt={f.validatingAirlineCodes} />
                  </div>

                  <div className={styles.flightCenter}>
                    <div className={styles.time}>
                      <p>Depart</p>
                      <div>{moment(f.itineraries[0].segments[0].departure.at).format('MM/DD/YYYY')}</div>
                      <div>{moment(f.itineraries[0].segments[0].departure.at).format('hh:mm a')}</div>
                    </div>

                    <div className={styles.duration}>
                      <div>{calculateDuration(f.itineraries[0].segments[0].arrival.at, f.itineraries[0].segments[0].departure.at)}</div>

                      <div>
                        {f.itineraries[0].segments[0].numberOfStops} stops
                      </div>
                    </div>

                    <div className={styles.time}>
                      <p>Arrive</p>
                      <div>{moment(f.itineraries[0].segments[0].arrival.at).format('MM/DD/YYYY')}</div>
                      <div>{moment(f.itineraries[0].segments[0].arrival.at).format('hh:mm a')}</div>
                    </div>
                  </div>

                  <div className={styles.flightRight}>
                    <span>Price</span>
                    <span className={styles.price}>{f.price.total}€</span>
                  </div>
                </div>
              ))}
              <div className={styles.moreFlights}>
                <div className={styles.flightAds}>
                  <div>
                    Want to find and explore
                    <h3>Different kinds of flights?</h3>
                  </div>

                  <div>
                    <img src={logo} alt='globuzzer' className={styles.globuzzerLogo} />
                  </div>
                </div>

                <div className={styles.moreOrLess} onClick={() => setFlightSize(flightSize + 4)}>
                  Explore more
                </div>
                {flightSize > 4 &&
                  <div className={styles.moreOrLess} onClick={() => setFlightSize(flightSize - 4)}>
                    Explore less
                  </div>}
              </div>
            </div>
            : <div style={{ display: 'flex', alignItems: 'center', margin: 'auto' }}>
              <VscLoading style={{ fontSize: 80 }} />
            </div>
          }

          {/* for the ads */}
          <div className={styles.vimeo}>
            <Vimeo city={topic} />
          </div>
        </div>

      }

    </section>
  )
}

export default Transportation
