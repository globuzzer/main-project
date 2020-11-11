import React from "react";
import { Link } from "react-router-dom";
import blueWoman from "../images/blue-woman.png";
import casualBoy from "../images/casualBoy.png";
import womanBlack from "../images/womanBlack.png";
import womanGlasses from "../images/womanGlasses.png";
import "./members.css";

function Members() {
  return (
    <section className="member-container">
      <header className="member-header">
        Top members to meet<div className="underline"></div>
      </header>

      <div className="member-details big-screen">
        <div className="details">
          <img src={blueWoman} alt="blueWoman" />
          <header>Asya</header>

          <p>
            <span>#cook</span>
            <span>#Finland</span>
          </p>
        </div>

        <div className="details">
          <img src={casualBoy} alt="casualBoy" />
          <header>Asya</header>

          <p>
            <span>#cook</span>
            <span>#Finland</span>
          </p>
        </div>

        <div className="details big-circle">
          <div className="inner-circle">
            <div className="front">
              <p>+</p>
            </div>
            <div className="back">
              <p>
                <Link to="/city" className="link">
                  Join us
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="details ">
          <img src={womanBlack} alt="womanBlack" />
          <header>Asya</header>

          <p>
            <span>#cook</span>
            <span>#Finland</span>
          </p>
        </div>

        <div className="details">
          <img src={womanGlasses} alt="womanGlasses" />
          <header>Asya</header>

          <p>
            <span>#cook</span>
            <span>#Finland</span>
          </p>
        </div>
      </div>

      {/* For screens less than or equal to 900px*/}
      <div className="member-details small-screen">
        <div className="details">
          <img src={blueWoman} alt="blueWoman" />
          <header>Asya</header>

          <p>
            <span>#cook</span>
            <span>#Finland</span>
          </p>
        </div>

        <div className="member-details-flex">
          <div className="details">
            <img src={casualBoy} alt="casualBoy" />
            <header>Asya</header>

            <p>
              <span>#cook</span>
              <span>#Finland</span>
            </p>
          </div>

          <div className="details">
            <div className="red-circle">
              <div className="red-circle-wrapper">
                <div className="red-circle-front">
                  <p>
                    <svg
                      stroke="currentColor"
                      fill="none"
                      strokeWidth="1.7"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      height="0.6em"
                      width=".6em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </p>
                </div>
                <div className="red-circle-back">
                  <Link to="/city" className="link">
                    <p>Join us</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="details ">
            <img src={womanBlack} alt="womanBlack" />
            <header>Asya</header>

            <p>
              <span>#cook</span>
              <span>#Finland</span>
            </p>
          </div>
        </div>

        <div className="details">
          <img src={womanGlasses} alt="womanGlasses" />
          <header>Asya</header>

          <p>
            <span>#cook</span>
            <span>#Finland</span>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Members;
