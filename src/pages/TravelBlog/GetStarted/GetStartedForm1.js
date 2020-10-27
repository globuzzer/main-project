import React, { useState, useContext } from "react";

 import { multiStepContext } from "./StepContext";

import "./GetStartedModal.css";

export default ({ nextStep }) => {
  //dynamic  multi stepper numbers
  const { setCurrentStepNumber } = useContext(multiStepContext);

  //initial state for form
  const [value, setValue] = useState("");

  //form eventhandler
  const handleChange = ({ target: { value } }) => {
    setValue(value);
  };

  //continue to the next page function
  const proceed = (e) =>
    e.preventDefault() | nextStep() | setCurrentStepNumber(2);
  const validateRadioButton = (e) => {
    let valids = false;
    const forms = document.myform.field;

    for (let i = 0; i < forms.length; i += 1) {
      if (forms[i].checked) {
        valids = true;
        break;
      }
    }
    if (valids) {
      proceed(e);
    } else {
      alert("Please select a topic");
    }
  };

  return (
    <React.Fragment>
      <div>
        <div className="grey_box">
          <div>
            <div className="form_container">
              <p className="require">
                * yes, you have to fill out these fields
              </p>
              <h4 className="tell">Tell us what you want to write about? *</h4>
              <form name="myform" onSubmit={proceed} className="formContainer1">
                <div className="form1">
                  <input
                    style={{ color: "#f24b6a" }}
                    type="radio"
                    value="CityGuides"
                    name="field"
                    onChange={handleChange}
                    checked={value === "CityGuides"}
                  />
                  <label className="choosey">City Guides</label>
                </div>
                <div className="form_underline" />

                <div className="form1">
                  <input
                    type="radio"
                    value="Travel Experiences"
                    name="field"
                    onChange={handleChange}
                    checked={value === "Travel Experiences"}
                  />
                  <label className="choosey">Experiences</label>
                </div>
                <div className="form_underline" />

                <div className="form1">
                  <input
                    type="radio"
                    value="I want to transfer my travel blog to Globuzzer"
                    name="field"
                    onChange={handleChange}
                    checked={
                      value === "I want to transfer my travel blog to Globuzzer"
                    }
                  />
                  <label className="choosey">
                    I want to transfer my travel blog to Globuzzer
                  </label>
                </div>

                <div className="form_underline" />

                <div className="form1">
                  <input
                    type="radio"
                    value="Other (Please explain in the field below)"
                    name="field"
                    onChange={handleChange}
                    checked={
                      value === "Other (Please explain in the field below)"
                    }
                  />
                  <label className="choosey">
                    Other (Please explain in the field below)
                  </label>
                </div>

                <div className="form1">
                  <textarea className="text_area" />
                </div>

                <button
                  onClick={(e) => {
                    validateRadioButton(e);
                  }}
                  className="continue"
                >
                  Continue
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
