import React, { useState } from "react";
import { city } from "../../../utils/data";
import { IconContext } from "react-icons";
import { BsSearch } from "react-icons/bs";
import { IoIosArrowDropleft } from "react-icons/io";
import { CgCheckO } from "react-icons/cg";
import "./cities.css";

function Cities({ history }) {
  const [cities] = useState(city);
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
    <div className="city-container">
      <div className="cityBack" onClick={() => history.goBack()}>
        <IconContext.Provider value={{ className: "backIcon" }}>
          <IoIosArrowDropleft />
        </IconContext.Provider>
        <span>Back</span>
      </div>

      <div className="city-content">
        <header>
          <span>Choose cities you like</span>
          <span>
            <IconContext.Provider value={{ className: "city-search" }}>
              <BsSearch />
            </IconContext.Provider>
            <input
              type="text"
              value={search}
              onChange={handleChange}
              placeholder="Search cities here..."
            />
          </span>
        </header>

        <div className="cities">
          {cityFilter().map((city) => (
            <div
              className="city-card"
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
                className="city-center"
                style={{
                  opacity: chosen.chosen && chosen.city === city.name && ".5",
                }}
              >
                <p>{city.name}</p>
                <p>{city.members} members</p>
              </div>

              {chosen.chosen && chosen.city === city.name && (
                <IconContext.Provider value={{ className: "good" }}>
                  <CgCheckO />
                </IconContext.Provider>
              )}
            </div>
          ))}
        </div>

        <div className="city-btn">
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
}

export default Cities;
