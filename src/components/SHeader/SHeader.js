import React from "react";
import { AiFillCaretRight } from "react-icons/ai";
import {Link} from "react-router-dom";
import { GetWindowDimension } from "../../utils/GetWindowDimension";
import SearchBar from "../../pages/Section/Header/SearchBar/SearchBar";

const SHeader = ({ city, cityName }) => {
const { img, title, subtitle, placeOne, placeTwo, placeThree } = city;
const { width } = GetWindowDimension();
  return (
    <>
      <section
        className="section_header"
        id="section_header"
        style={{backgroundImage: `url(${img})`}}
      >
        <div
          className="city_header_url"
        >
          <Link to="/">
            <p style={{color: "white"}}>Landing Page</p>
          </Link>
          <AiFillCaretRight className="city_header_url_icon" />
          <p style={{textTransform: "capitalize"}}>{cityName}</p>
        </div>
        <div className="headers">
          <p
            id="header_1"
            style={{...{...title}.style, fontSize: width > 1100 ? ({...title}.style || {}).fontSize : ""}}
          >
            {{...title}.content}
          </p>
          <p
            id="header_2"
            style={{...{...subtitle}.style, fontSize: width > 1100 ? ({...subtitle}.style || {}).fontSize : ""}}
          >
            {{...subtitle}.content}
          </p>
        </div>
        <SearchBar sectionName={cityName}/>
        <div>
          <div id="header_suggestion">
            Maybe{" "}
            <a
              style={{color: {...placeOne}.color}}
              href={{...placeOne}.link}
              target="_new"
            >
              {{...placeOne}.text}
            </a>
            {", "}
            <a
              style={{color: {...placeTwo}.color}}
              href={{...placeTwo}.link}
              target="_new"
            >
              {{...placeTwo}.text}
            </a>
            {" or "}
            <a
              style={{color: {...placeThree}.color}}
              href={{...placeThree}.link}
              target="_new"
            >
              {{...placeThree}.text}
            </a>
            {" ?"}
          </div>
        </div>
      </section>
    </>
  );
};

export default SHeader;
