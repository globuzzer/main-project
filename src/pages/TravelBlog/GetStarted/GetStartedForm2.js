import React, { useContext, useState } from "react";
import "./GetStartedModal.css";
import { multiStepContext } from "./StepContext";
import Firebase from "firebase";
import { FIREBASE_CONFIG as firebaseConfig } from "../config/firebaseConfig";
// Initialize Firebase
Firebase.initializeApp(firebaseConfig);
Firebase.analytics();
//retrieving data from firebase
const database = Firebase.firestore();
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
function GetStartedForm2({
  nextStep,
  prevStep,
  values,
  changeValue,
  formErrors,
}) {
  //dynamic  multi stepper numbers
  const { setCurrentStepNumber } = useContext(multiStepContext);
  const [state, setState] = useState({
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
  });
  //adding data to data base
  const addNewBlogger = () => {
    database.collection("bloggers").add({
      firstName: state.firstName,
      lastName: state.lastName,
      email: state.email,
      PhoneNumber: state.PhoneNumber,
    });
  };
  //proceed to next step
  const proceed = (e) => {
    e.preventDefault() || nextStep() || setCurrentStepNumber(3);
  };
  //previous step
  const previous = (e) => {
    e.preventDefault();
    prevStep();
  };
  //validate form
  const formValidation = (e) => {
    const validforms = document.forms["myForm"]["firstName"].value;
    const boxy = document.getElementById("privacy").checked;
    if (validforms === "" || boxy === "") {
      alert("Please fill in your information");
    } else {
      proceed(e);
    }
  };
  //passing props from MultiStep Component
  //const { values, changeValue, formErrors } = props;
  return (
    <div>
      <div className="grey_box2">
        <div className="form_container">
          <p className="require">* yes, you have to fill out these fields</p>
          <h4 className="tell">Add your personal information</h4>
          <form name="myForm" onSubmit={formValidation} noValidate>
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
                onClick={(e) => formValidation(e) | addNewBlogger()}
                className="continue2"
              >
                Continue
              </button>
              <a
                href="#"
                onClick={(e) => previous(e) | setCurrentStepNumber(1)}
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
export default GetStartedForm2;
