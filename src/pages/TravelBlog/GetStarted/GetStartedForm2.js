import React, { Component } from "react";
import "./GetStartedModal.css";
//import { Form, Button, Container } from "react-bootstrap";
//import { multiStepContext } from "./StepContext";

import { config as firebaseConfig, database } from "../config/firebaseConfig";

// Initialize Firebase

//retrieving data from firebase

database
  .collection("bloggers")
  .get()
  .then((resp) => {
    console.log("resp is: ");
    console.log(resp);
    console.log("resp.docs is: " + resp.docs);
    console.log(resp.docs);
    console.log("resp.docs[0].data()");
    console.log(resp.docs[0].data());
  })
  .catch((err) => {
    console.log(err);
  });

//state
class GetStartedForm extends Component {
  //dynamic  multi stepper numbers
  // static contextType = multiStepContext;
  state = {
    firstName: "",
    lastName: "",
    email: "",
    PhoneNumber: "",
    formErrors: {
      firstName: "",
      lastName: "",
      email: "",
      PhoneNumber: "",
    },
  };
  //adding data to data base
  addNewBlogger = () => {
    database.collection("bloggers").add({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      PhoneNumber: this.state.PhoneNumber,
    });
  };

  //proceed to next step
  proceed = (e) => {
    const { setCurrentStepNumber } = this.context;
    e.preventDefault();
    this.props.nextStep();
    //setCurrentStepNumber(3);
  };

  //previous step
  previous = (e) => {
    e.preventDefault();
    this.props.prevStep();
  };

  //validate form
  formValidation = (e) => {
    const validforms = document.forms["myForm"]["firstName"].value;
    const boxy = document.getElementById("privacy").checked;
    if (validforms === "" || boxy === "") {
      alert("Please fill in your information");
    } else {
      this.proceed(e);
    }
  };

  render() {
    //passing props from MultiStep Component
    const { values, changeValue, formErrors } = this.props;
    //dynamic  multi stepper numbers
    const { setCurrentStepNumber } = this.context;

    return (
      <div>
        <div className="grey_box2">
          <div className="form_container">
            <p className="require">* yes, you have to fill out these fields</p>
            <h4 className="tell">Add your personal information</h4>
            <form name="myForm" onSubmit={this.formValidation} noValidate>
              <div>
                <input
                  noValidate
                  className="text_input"
                  placeholder="First name *"
                  name="firstName"
                  onChange={changeValue("firstName")}
                  defaultValue={values.firstName}
                />

                {formErrors?.firstName?.length > 0 && (
                  <div className="errorMessage">{formErrors.firstName}</div>
                )}
              </div>

              <div>
                <input
                  noValidate
                  className="text_input"
                  type="text"
                  placeholder="Last name *"
                  name="lastName"
                  onChange={changeValue("lasttName")}
                  defaultValue={values.lastName}
                />
                {formErrors?.lastName?.length > 0 && (
                  <div className="errorMessage">{formErrors.lastName}</div>
                )}
              </div>

              <div>
                <input
                  noValidate
                  className="text_input"
                  type="email"
                  placeholder="Email *"
                  onChange={changeValue("email")}
                  defaultValue={values.email}
                  name="email"
                />
                {formErrors?.email?.length > 0 && (
                  <div className="errorMessage">{formErrors.email}</div>
                )}
              </div>

              <div>
                <input
                  noValidate
                  className="text_input"
                  type="tel"
                  id="phone"
                  placeholder="Phone number"
                  name="PhoneNumber"
                  onChange={changeValue("PhoneNumber")}
                  defaultValue={values.PhoneNumber}
                />
                {formErrors?.PhoneNumber?.length > 0 && (
                  <div className="errorMessage">{formErrors.PhoneNumber}</div>
                )}
              </div>

              <div className="requires agrees">
                <input type="checkbox" id="privacy" value="Privacy" />
                <span className="conditions">
                  *I agree to the
                  <em style={{ color: "#de3857" }}>
                    Privacy Policy and Terms of Service.
                  </em>
                </span>
              </div>

              <div>
                <button
                  onClick={(e) => this.formValidation(e) | this.addNewBlogger()}
                  className="continue2"
                >
                  Continue
                </button>

                <a
                  href="#"
                  onClick={(e) => this.previous(e) | setCurrentStepNumber(1)}
                  className="backs"
                >
                  back
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default GetStartedForm;
