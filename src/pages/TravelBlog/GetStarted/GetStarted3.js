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

  render() {
    const { setCurrentStepNumber } = this.context;
    return (
      <div>
        <div className="grey_box3">
          {/* FREE PACKAGE */}
          <form className="package_box" name="myPackage">
            <img src={fre} alt="easys" className="package_free package1" />

            {/* Choose button */}
            <ChooseButton
              type="free"
              state={this.state}
              setState={(type) => this.setState(type)}
              id="free_button"
            />

            {/* PREMIUM PACKAGE */}

            <img
              src={prem}
              alt="easys"
              className="package_premium package_free"
            />

            <ChooseButton
              type="premium"
              state={this.state}
              id="premium_button"
              setState={(type) => this.setState(type)}
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

const ChooseButton = ({ state, setState, type }) => (
  <Button
    variant="custom"
    className={`px-4 py-2 ${state.plan === type && "active"}`}
    onClick={() => setState({ plan: type })}
    className="free_premium_button"
  >
    Choose <i class="fa fa-angle-right" aria-hidden="true"></i>
  </Button>
);
