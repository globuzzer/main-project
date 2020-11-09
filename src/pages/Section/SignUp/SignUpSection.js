import React, { useState } from "react";
import styles from "./SignUp.module.css";
import { SignUpData } from "../../../assets/Section/SignUp/SignUpData";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowDropleft } from "react-icons/io";
import { CgCheckO } from "react-icons/cg";

const SignUpSection = ({ history }) => {
  const [cities] = useState(SignUpData);
  const [chosen, setChosen] = useState({ chosen: false, city: null });
  const [search, setSearch] = useState("");

  const handleClick = (city) => {
    const selected = { ...chosen };
    if (chosen.city === city.name) selected.chosen = !selected.chosen;
    else selected.chosen = true;

    selected.city = city.name;
    setChosen(selected);
  };

  const handleChange = ({ target: input }) => {
    setSearch(input.value);
  };

  const handleGo = () => {
    history.push(`/cities/${chosen.city}`);
  };

  const cityFilter = () => {
    const searchValue = search.toLowerCase();
    const cityFilter =
      search.length > 0
        ? cities.filter(
            (city) =>
              city.name.toLocaleLowerCase().startsWith(searchValue) ||
              city.name.toLocaleLowerCase().endsWith(searchValue) ||
              city.name.includes(searchValue)
          )
        : cities;

    return cityFilter;
  };
  return (
    <div className={styles.container}>
      <div className={styles.cityBack} onClick={() => history.goBack()}>
        <IconContext.Provider value={{ className: "backIcon" }}>
          <IoIosArrowDropleft />
        </IconContext.Provider>
        <span>Back</span>
      </div>

      <div className={styles.content}>
        <header>
          <span>Choose cities you like</span>
          <span className={styles.searchBar}>
            <BsSearch className={styles.icon} size="25px" />
            <input
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="Search cities here..."
            />
          </span>
        </header>

        <div className={styles.cities}>
          {cityFilter().map((city) => (
            <div
              className={styles.cityCard}
              key={city.id}
              onClick={() => handleClick(city)}
            >
              <img
                src={city.img}
                alt="city"
                style={{
                  opacity: chosen.chosen && chosen.city === city.name && ".5",
                }}
              />
              <div
                className={styles.cityCenter}
                style={{
                  opacity: chosen.chosen && chosen.city === city.name && ".5",
                }}
              >
                <p>{city.name}</p>
                <p>{city.members} members</p>
              </div>

              {chosen.chosen && chosen.city === city.name && (
                <CgCheckO className={styles.good} />
              )}
            </div>
          ))}
        </div>

        <div className={styles.cityBtn}>
          <button
            disabled={!chosen.chosen && "disabled"}
            style={{ cursor: !chosen.chosen && "not-allowed" }}
            onClick={handleGo}
          >
            Let's go
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUpSection;
