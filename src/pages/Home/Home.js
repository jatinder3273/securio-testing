import React, { useState } from "react";
import StepOne from "./Sections/StepOne";
import StepTwo from "./Sections/StepTwo";
import StepThree from "./Sections/StepThree";
import StepFour from "./Sections/StepFour";
import { useHistory } from "react-router-dom";
import { Encrypt } from "../../config/common";
import Swal from "sweetalert2";
import { db } from "../../config/firestore";

const Home = () => {
  const history = useHistory();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [activeStep, setActiveStep] = useState("first");
  const handleSubmit = (event, stepName) => {
    event.preventDefault();
    if (!formValidate(stepName)) {
      return false;
    }
    if (stepName === "second") {
      if (values.state !== "OHIO" && values.state !== "NEW JERSEY" && values.state !== "PENNSYLVANIA") {
        Swal.fire({
          text:
            "Sorry we are not available in your state yet, but please share your email and we will be in touch once we are!",
          icon: "warning",
          input: "email",
          inputAttributes: {
            autocapitalize: "off",
            id: "login"
          },
          showCancelButton: true,
          confirmButtonText: "Submit",
          showLoaderOnConfirm: true,
          preConfirm: async login => {
            if (!login) {
              Swal.showValidationMessage(`Please enter your email`);
              return false;
            }
            try {
              const isExist = await db
                .collection("notifyUser")
                .where("email", "==", login)
                .where("state", "==", values.state)
                .get();
              if (isExist.empty) {
                return await db.collection("notifyUser").add({
                  email: login,
                  state: values.state
                });
              }
              Swal.fire("Thanku for visiting our website", "We shall contact you soon", "success");
              return true;
            } catch (error) {
              Swal.showValidationMessage(`Request failed: ${error}`);
            }
          },
          allowOutsideClick: () => !Swal.isLoading()
        });
        return false;
      }
    }
    if (stepName !== "last") {
      setActiveStep(stepName);
      return false;
    }
    let newValues = { ...values, premiumAddOn: values.premiumAddOn ?? [] };

    var cryptedData = Encrypt(newValues);
    history.push(`/package?_request=${cryptedData}`);
  };

  /**
   * Handle onChnage Event of all input fields
   * @param {HTMLInputElement} event
   */
  const handleOnChange = event => {
    setValues(values => ({ ...values, [event.target.name]: event.target.value }));
    setErrors(errors => ({ ...errors, [event.target.name]: "" }));
    if (!event.target.value) {
      setErrors(errors => ({ ...errors, [event.target.name]: "Above field is required." }));
    }
    if (event.target.name === "desiredCoverage") {
      let desiredCoverage = values.desiredCoverage ?? [];
      if (event.target.checked) {
        desiredCoverage.push(event.target.value);
      } else {
        desiredCoverage = desiredCoverage
          ? desiredCoverage.filter(function(item) {
              return item !== event.target.value;
            })
          : [];
      }
      setValues(values => ({ ...values, [event.target.name]: desiredCoverage }));
      setErrors(errors => ({ ...errors, [event.target.name]: "" }));
    }
    if (event.target.name === "premiumAddOn") {
      let premiumAddOn = values.premiumAddOn ?? [];
      if (event.target.checked) {
        premiumAddOn.push(event.target.value);
      } else {
        premiumAddOn = premiumAddOn
          ? premiumAddOn.filter(function(item) {
              return item !== event.target.value;
            })
          : [];
      }
      setValues(values => ({ ...values, [event.target.name]: premiumAddOn }));
      setErrors(errors => ({ ...errors, [event.target.name]: "" }));
    }
  };

  /**
   * Handle onChnage Event of date input field
   * @param {DATE} date
   */
  const handleDobEvent = date => {
    setValues(values => ({ ...values, dob: date }));
    setErrors(errors => ({ ...errors, dob: "" }));
    if (!date) {
      setErrors(errors => ({ ...errors, dob: "Above field is required." }));
    }
  };
  /**
   * Form validation of login form
   */
  const formValidate = step => {
    let isValid = true;
    setErrors({});
    let fieldList = [];
    if (step === "second") {
      fieldList = ["firstName", "lastName", "city", "dob", "state", "noOfDependents"];
    }
    if (step === "third") {
      fieldList = ["desiredCoverage"];
    }
    if (step === "forth") {
      fieldList = ["coverageLimit"];
    }
    for (let x of fieldList) {
      if (!values[x]) {
        isValid = false;
        setErrors(errors => ({
          ...errors,
          [x]: x === "desiredCoverage" || x === "premiumAddOn" ? "At least one must be selected." : "Above field is required."
        }));
      }

      if (x === "desiredCoverage" || x === "premiumAddOn") {
        if (values[x] && values[x].length === 0) {
          isValid = false;
          setErrors(errors => ({ ...errors, [x]: "At least one must be selected." }));
        }
      }
    }
    return isValid;
  };

  return (
    <div className="container">
      {activeStep === "first" ? (
        <StepOne
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          values={values}
          errors={errors}
          handleDobEvent={handleDobEvent}
        />
      ) : (
        ""
      )}
      {activeStep === "second" ? (
        <StepTwo handleSubmit={handleSubmit} handleOnChange={handleOnChange} values={values} errors={errors} />
      ) : (
        ""
      )}
      {activeStep === "third" ? (
        <StepThree handleSubmit={handleSubmit} handleOnChange={handleOnChange} values={values} errors={errors} />
      ) : (
        ""
      )}
      {activeStep === "forth" ? (
        <StepFour handleSubmit={handleSubmit} handleOnChange={handleOnChange} values={values} errors={errors} />
      ) : (
        ""
      )}
    </div>
  );
};

export default Home;
