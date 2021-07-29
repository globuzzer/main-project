import React from 'react';
import videos from "./video_articles.module.css";
import { IconContext } from "react-icons";
import { TiArrowSortedDown } from "react-icons/ti";
import { BsSearch } from "react-icons/bs";

const SearchMore = () => {
  return (
    <>
      <header>What are you looking for ?</header>

      <div className={videos.articleRightForm}>
        <select>
          <option>Discover Helsinki</option>
        </select>

        <p className={videos.formselect}>
          <IconContext.Provider value={{ className: "dropIcon" }}>
            <TiArrowSortedDown className={videos.dropIcon} />
          </IconContext.Provider>
        </p>
      </div>

      <div className={videos.articleRightForm}>
        <select>
          <option>Topic: Accomodation</option>
        </select>

        <p className={videos.formselect}>
          <IconContext.Provider value={{ className: "dropIcon" }}>
            <TiArrowSortedDown className={videos.dropIcon} />
          </IconContext.Provider>
        </p>
      </div>

      <div className={videos.articleRightForm}>
        <input type="text" placeholder="Search anything you want" />
        <p className={videos.formsearch}>
          <IconContext.Provider value={{ className: "search-icon" }}>
            <BsSearch />
          </IconContext.Provider>
        </p>
      </div>
    </>
  )
}

export default SearchMore
