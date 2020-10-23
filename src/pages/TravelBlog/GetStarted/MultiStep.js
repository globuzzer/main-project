import React, { Component } from "react";
import GetStartedForm1 from "./GetStartedForm1";
import GetStartedForm2 from "./GetStartedForm2";
import GetStarted3 from "./GetStarted3";
import GetStarted4 from "./GetStarted4";

//email validation expression
const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

//phone validation
const phoneRegex = RegExp(
  /^(\+{1}\d{2,3}\s?[(]{1}\d{1,3}[)]{1}\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}$/
);

export class MultiStep extends Component {
  state = {
    step: 1,
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

  //proceed to next step
  nextStep = () => {
    const { step } = this.state;
    this.setState({
      step: step + 1,
    });
  };
  // previous step
  prevStep = () => {
    const { step } = this.state;
    this.setState({
      step: step - 1,
    });
  };

  //handle change of value
  changeValue = () => (e) => {
    e.preventDefault();
    const { name, value } = e.target;

    let formErrors = this.state.formErrors;

    console.log("value: ", value);
    console.log("name: ", name);

    switch (name) {
      case "firstName":
        formErrors.firstName =
          value.length < 3 && value.length > 0
            ? "Please fill in correct info"
            : "";
        break;
      case "lastName":
        formErrors.lastName =
          value.length < 3 && value.length > 0
            ? "Please fill in correct info"
            : "";
        break;
      case "email":
        formErrors.email = emailRegex.test(value)
          ? ""
          : "invalid email address";
        break;
      case "PhoneNumber":
        formErrors.PhoneNumber = phoneRegex.test(value)
          ? ""
          : "Invalid phone number";
        break;
      default:
        break;
    }
    this.setState({
      formErrors,
      [name]: value,
    });
  };

  render() {
    const { setShowHeader } = this.props;
    const { step, formErrors } = this.state;
    const { firstName, lastName, email, PhoneNumber } = this.state;
    const values = { firstName, lastName, email, PhoneNumber };

    switch (step) {
      case 1:
        return (
          <GetStartedForm1
            nextStep={this.nextStep}
            changeValue={this.changeValue}
            values={values}
            formErrors={formErrors}
            onSubmit={this.handleSubmit}
          />
        );
      case 2:
        return (
          <GetStartedForm2
            changeValue={this.changeValue}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            onClick={this.changeBackground}
            formErrors={formErrors}
          />
        );
      case 3:
        return (
          <GetStarted3
            changeValue={this.changeValue}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
            values={values}
            formErrors={formErrors}
          />
        );

      case 4:
       return <GetStarted4 {...{ setShowHeader }} />;
      default:
        break;
    }
  }
}

export default MultiStep;
