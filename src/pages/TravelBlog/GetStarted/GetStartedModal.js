import React, { useState, useEffect } from "react";
import "./GetStartedModal.css";
import ReactDOM from "react-dom";
import MultiStep from "./MultiStep";

const GetStartedModal = ({ isShowing, steps, currentStep, hide }) => {
  const [stepState, setStepState] = useState([]);
  const [showHeader, setShowHeader] = useState(true);

  useEffect(() => {
    let createSteps = steps.map((step, index) => ({
      description: step.description,
      completed: index < currentStep - 1, // past are completed
      selected: index <= currentStep - 1, // past & present are colored
      highlighted: index === currentStep - 1, // only present is highlighted
    }));
    // return stepObject;
    setStepState(createSteps);
  }, [steps, currentStep]);

  //toggle the getstarted button to open modal
  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className="overlay">
            <div className="modal_box">
              {/* Modal cards multi stepper */}
              <div
                className={`header_box ${showHeader ? "d-block" : "d-none"}`}
              >
                <div id="header_box2">
                  <button onClick={hide} id="close">
                    X
                  </button>
                  <div>
                    <div className="topic">
                      <h2 id="start">APPLICATION FORM</h2>
                    </div>
                    <div className="stepper-container-horizontal">
                      <div className="steps_wrapper">
                        {stepState.map(
                          (
                            { description, completed, selected, highlighted },
                            index
                          ) => (
                            <div className="circle_wrap" key={index}>
                              <div
                                className={`circle1 ${
                                  selected
                                    ? "circle1-active"
                                    : "circle1-disabled"
                                }`}
                              >
                                {completed ? index + 1 : index + 1}
                              </div>
                              <div
                                id="new-line"
                                className={`circle_text ${
                                  highlighted ? "circle_text_active" : ""
                                }`}
                              >
                                {description}
                              </div>
                              {index + 1 !== stepState.length && (
                                <div
                                  className={`divider-line divider-line-${stepState.length}`}
                                ></div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <MultiStep {...{ setShowHeader }} />
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default GetStartedModal;
