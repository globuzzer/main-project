import React, { useEffect, useState } from "react";
import { AiFillCaretRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./style.css";
import { firestore } from "../../utils/firebase.utils";
import styles from "./index.module.css";
import SHeader from "../../components/SHeader/SHeader";
import Services from "../../components/Services/Services";
import Topics from "../../components/Topics/Topics";
import SliderBanner from "../../components/SliderBanner/SliderBanner";
import Vimeo from "../../components/Vimeo/Vimeo";
import Members from "../../components/Members/Members";
import Articles from "../../components/Articles/Articles";
import { OwnSection } from "../../components/OwnSection/OwnSection";
import { Footer } from "../../components/Footer/Footer";
import TopVideos from "../../components/TopVideos/TopVideos";

const City = ({ name }) => {
  const [currentCity, setCurrentCity] = useState({});
  const cityName = name.replace("/", "");

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
  }, []);

  return (
    currentCity ? (
      <div className={styles.section}>
        <div className={styles.header}>
          <SHeader city={currentCity} cityName={cityName}/>
        </div>
        <div className={styles.main}>
          <div className={styles.center}>
            <div className={styles.services}>
              <Services city={currentCity} />
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
        <section className="helsinki_header">
          <div className="helsinki_header_url">
            <Link to="/">
              <p>Landing Page</p>
            </Link>
            <AiFillCaretRight className="helsinki_header_url_icon" />
            <p>{cityName}</p>
          </div>
          <p id="header_1" >page not found</p>
          <p id="helsinki_header_2">try another city</p>
        </section>
        <div className={styles.footer}>
          <OwnSection />
          <Footer />
        </div>
      </div>
    )
  );
};

export default City;
