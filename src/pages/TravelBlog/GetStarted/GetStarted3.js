import React, { Component } from "react";
import { Button } from "react-bootstrap";
import prem from "../../../assets/TravelBlog/prem.svg";
import fre from "../../../assets/TravelBlog/fre.svg";
import "./GetStartedModal.css";
import { multiStepContext } from "./StepContext";

class GetStarted3 extends Component {
  //static contextType = multiStepContext;
  state = {
    plan: null,
  };

  //proceed to next step
  proceed = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  //previous step
  previous = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  //validating package plans
  validatePlanButton = (e) => {
    if (this.state.plan) {
      this.proceed(e);
    } else {
      alert("Please select a package plan");
    }
  };

  setPlan = (type) => {
    this.setState({ plan: type });
  };

  render() {
    return (
      <div>
        <div className="grey_box3">
          {/* FREE PACKAGE */}
          <form className="package_box" name="myPackage">
            <img src={fre} alt="easys" className="package_free package1" />

            {/* Choose button */}
            <ChooseButton
              className={`free_premium_button ${
                this.state.plan === "free" && "free_button"
              }`}
              onClick={() => this.setPlan("free")}
            />

            {/* PREMIUM PACKAGE */}

            <img
              src={prem}
              alt="easys"
              className="package_premium package_free"
            />

            <ChooseButton
              className={`free_premium_button ${
                this.state.plan === "premium" && "premium_button"
              }`}
              onClick={() => this.setPlan("premium")}
            />
          </form>
          <div className="continue3">
            <button
              onClick={(e) => this.validatePlanButton(e)}
              className="choose3"
              style={{ color: "#FFFFFF" }}
            >
              Send
            </button>

            <div>
              <a
                href="#"
                onClick={(e) => this.previous(e)}
                //| setCurrentStepNumber(2)
                className="backs"
              >
                back
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GetStarted3;

const ChooseButton = ({ className, onClick }) => (
  <Button className={className} onClick={onClick}>
    Choose
  </Button>
);
