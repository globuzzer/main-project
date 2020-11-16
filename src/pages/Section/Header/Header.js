import React from "react";
import { AiFillCaretRight } from "react-icons/ai";
import SearchBar from "./SearchBar/SearchBar";
import styles from  "./Header.module.css";
import JoinCityData from '../../../Data/JoinCityData';
import { useParams } from "react-router-dom";
const Header = () => {
  let {city} = useParams();
  const data = JoinCityData.find((data)=>data.name === city)
  return (
    <div className={styles.header}>
      <div className={styles.content}>
        <div className={styles.url}>
          <p>
            <a href="https://globuzzer.com/">Landing Page</a>
          </p>
          <AiFillCaretRight className={styles.icon} />
          <p>
            <a id="city-name" href="#">{data.name}</a>
          </p>
        </div>
        <div className={styles.text}>
          <p className={styles.textOne}>{data.name} Community</p>
          <p className={styles.textTwo}>Explore different topics and information</p>
          <SearchBar />
          <p className={styles.suggestions}>
            Maybe <a href="https://globuzzer.mn.co/groups/195831/feed">Attractions</a>,<a href="https://globuzzer.mn.co/groups/195832/feed"> Career</a> or{" "}
            <a href="https://globuzzer.mn.co/groups/195834/feed">Culture</a>?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
