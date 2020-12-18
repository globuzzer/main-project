import React from "react";
import { Link } from "react-router-dom";
import blueWoman from "../images/blue-woman.png";
import casualBoy from "../images/casualBoy.png";
import womanBlack from "../images/womanBlack.png";
import womanGlasses from "../images/womanGlasses.png";
import member from "./members.module.css";

function Members() {
  return (
    <section className={member.container}>
      <header className={member.header}>
        Top members to meet<div className={member.underline}></div>
      </header>

      <div className={`${member.mdetails} ${member.bigscreen}`}>
        <div className={member.details}>
          <img src={blueWoman} alt="blueWoman" />
          <header>Asya</header>

          <p>
            <span>#cook</span>
            <span>#Finland</span>
          </p>
        </div>

        <div className={member.details}>
          <img src={casualBoy} alt="casualBoy" />
          <header>Asya</header>

          <p>
            <span>#cook</span>
            <span>#Finland</span>
          </p>
        </div>

        <div className={`${member.details} ${member.bigcircle}`}>
          <div className={member.innercircle}>
            <div className={member.front}>
              <p>+</p>
            </div>
            <div className={member.back}>
              <p>
                <Link to="/city" className={member.link}>
                  Join us
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className={member.details}>
          <img src={womanBlack} alt="womanBlack" />
          <header>Asya</header>

          <p>
            <span>#cook</span>
            <span>#Finland</span>
          </p>
        </div>

        <div className={member.details}>
          <img src={womanGlasses} alt="womanGlasses" />
          <header>Asya</header>

          <p>
            <span>#cook</span>
            <span>#Finland</span>
          </p>
        </div>
      </div>

      {/* For screens less than or equal to 900px*/}
      <div className={`${member.mdetails} ${member.smallscreen}`}>
        <div className={member.details}>
          <img src={blueWoman} alt="blueWoman" />
          <header>Asya</header>

          <p>
            <span>#cook</span>
            <span>#Finland</span>
          </p>
        </div>

        <div className={member.detailsflex}>
          <div className={member.details}>
            <img src={casualBoy} alt="casualBoy" />
            <header>Asya</header>

            <p>
              <span>#cook</span>
              <span>#Finland</span>
            </p>
          </div>

          <div className={member.details}>
            <div className={member.redcircle}>
              <div className={member.redcirclewrapper}>
                <div className={member.redcirclefront}>
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
                <div className={member.redcircleback}>
                  <Link to="/city" className={member.link}>
                    <p>Join us</p>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={member.details}>
            <img src={womanBlack} alt="womanBlack" />
            <header>Asya</header>

            <p>
              <span>#cook</span>
              <span>#Finland</span>
            </p>
          </div>
        </div>

        <div className={member.details}>
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
