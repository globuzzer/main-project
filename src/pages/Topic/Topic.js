import React, { useRef } from "react";
import Menu from "./menu/menu";
import Banner from "./banner/banner";
import Body from "./body/body";
import { Footer } from "../../components/Footer/Footer";
import { hotelRefContext, articleRefContext } from "../../contexts/refs";

function Topic() {
  const hotelRef = useRef(null);
  const articleRef = useRef(null);

  return (
    <React.Fragment>
      <Menu />
      <hotelRefContext.Provider value={hotelRef}>
        <articleRefContext.Provider value={articleRef}>
          <Banner />
          <Body />
        </articleRefContext.Provider>
      </hotelRefContext.Provider>

      <Footer />
    </React.Fragment>
  );
}

export default Topic;
