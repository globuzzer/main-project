import React from "react";
import { Link } from "react-router-dom";
import { IoIosArrowDropleft } from "react-icons/io";
import "../css/SignUpNow.css";
import "../css/Home.css";

const SignUpNow = () => {
  return (
    <div className="main-container">
      <header>
      <Link to="/" className="back-home">
        <IoIosArrowDropleft className="icon-back"/>
        <p>Back</p>
      </Link>
      </header>
      <div>
        <input type="text" />
      </div>
    </div>
  );
}

export default SignUpNow;
