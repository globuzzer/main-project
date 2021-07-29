import React, { useEffect, useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./style.css";
import { firestore } from "../../utils/firebase.utils";
import styles from "./index.module.css";
import SHeader from "../../components/Header/SHeader";
import Services from "../../components/Services/Services";
import Topics from "../../components/Topics/Topics";
import SliderBanner from "../../components/SliderBanner/SliderBanner";
import Vimeo from "../../components/Vimeo/Vimeo";
import Members from "../../components/Members/Members";
import Articles from "../../components/Articles/Articles";
import { OwnSection } from "../../components/OwnSection/OwnSection";
import { Footer } from "../../components/Footer/Footer";
import TopVideos from "../../components/TopVideos/TopVideos";
import { HomeValue } from "../../components/HomeValue/HomeValue";
import useFetchDoc from "../../hooks/useFetchDoc";
import NavBar from "../Section/Header/NavBar/NavBar";
import Spinner from "../../components/Spinner/Spinner";

const City = ({ name }) => {
  console.log(name.split('/')[2])
  const [currentCity, setCurrentCity] = useState({});
  const cityName = name.replace("/", "");
  const features = useFetchDoc("features");

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
        setCurrentCity(newCity.filter((c) => c.name.toLowerCase() === cityName.toLowerCase())[0]);
      });
    return () => unsubscribe();
  }, [cityName]);
 

  return (
    !features.loading ? (
      currentCity ? (
        <div className={styles.section}>
          {/* <NavBar /> */}
          <div className={styles.header}>
            <SHeader city={currentCity} cityName={cityName} />
          </div>
          <div className={styles.main}>
            <div className={styles.center}>
              <div className={styles.services}>
                {/* <Services city={currentCity} /> */}
                {/* just temporar... */}
                <section className="section_value">
                  <HomeValue
                    src={features.items[0].image}
                    imgCaption={features.items[0].title}
                    alt="value"
                    imgDescription={features.items[0].text}
                  />
                  <HomeValue
                    src={features.items[1].image}
                    imgCaption={features.items[1].title}
                    alt="value"
                    imgDescription={features.items[1].text}
                  />
                  <HomeValue
                    src={features.items[2].image}
                    imgCaption={features.items[2].title}
                    alt="value"
                    imgDescription={features.items[2].text}
                  />
                </section>
                {/* ....... */}
                <Topics city={currentCity} cityName={cityName} />
              </div>
              <div className={styles.slider}>
                <SliderBanner city={currentCity} />
                <Vimeo city={currentCity} />
              </div>
            </div>
            <div className={styles.members}>
              <Members city={currentCity} />
            </div>
            <div className={styles.articles}>
              <Articles city={currentCity} />
            </div>
            <div className={styles.relocate}>
              <TopVideos city={currentCity} />
            </div>
          </div>
          <div className={styles.footer}>
            <OwnSection />
            <Footer />
          </div>
        </div>
      )
        : (
          <div>
            <section className="city_header">
              <div className="city_header_url">
                <Link to="/">
                  <p>Landing Page</p>
                </Link>
                <AiFillCaretRight className="city_header_url_icon" />
                <p>{cityName}</p>
              </div>
              <p id="header_1" >page not found</p>
              <p id="city_header_2">try another city</p>
            </section>
            <div className={styles.footer}>
              <OwnSection />
              <Footer />
            </div>
          </div>
        )
    ) : (
      <section className="city_header" style={{ background: "white" }}>
        <Spinner />
      </section>
    )

  );
};

export default City;
