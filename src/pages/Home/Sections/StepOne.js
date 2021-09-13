import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { usStates } from "../../../constant/states";
import moment from "moment";

const StepOne = ({ handleSubmit, handleOnChange, values, errors, handleDobEvent }) => {
  return (
    <>
      <form onSubmit={e => handleSubmit(e, "second")}>
        <div className="Heading_Welcome">
          <h2>Welcome to Securio.</h2>
        </div>
        <div className="row col-lg-12  Form">
          <div className="form-group col-lg-4">
            <label htmlFor="first-name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first-name"
              name="firstName"
              onChange={handleOnChange}
              value={values.firstName ?? ""}
            />
            {errors.firstName ? <small className="text-danger">{errors.firstName}</small> : ""}
          </div>
          <div className="form-group col-lg-4">
            <label htmlFor="inputPassword4">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last-name"
              name="lastName"
              onChange={handleOnChange}
              value={values.lastName ?? ""}
            />
            {errors.lastName ? <small className="text-danger">{errors.lastName}</small> : ""}
          </div>
        </div>
        <div className="row col-lg-12 Form">
          <div className="form-group col-lg-4">
            <label htmlFor="inputEmail4">Date of Birth</label>
            <div>
              <DatePicker
                className="form-control"
                selected={values.dob}
                dateFormat="dd/MM/yyyy"
                maxDate={new Date(moment().subtract(1, "days"))}
                onChange={date => handleDobEvent(date)}
              />
            </div>
            {errors.dob ? <small className="text-danger">{errors.dob}</small> : ""}
          </div>
          <div className="form-group col-lg-4">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              name="city"
              onChange={handleOnChange}
              value={values.city ?? ""}
            />
            {errors.city ? <small className="text-danger">{errors.city}</small> : ""}
          </div>
        </div>
        <div className="Form">
          <div className="row col-lg-12 ">
            <div className="form-group col-lg-4">
              <label htmlFor="inputState"> State</label>
              <div>
                <i className="fa fa-angle-down mt-2" />
                <select className="form-control" name="state" onChange={handleOnChange}>
                  <option values="" selected disabled>
                    Select State
                  </option>
                  {usStates && usStates.length > 0
                    ? usStates.map((state, index) => (
                        <option key={index} values={state.name}>
                          {state.name}
                        </option>
                      ))
                    : ""}
                </select>
              </div>
              {errors.state ? <small className="text-danger">{errors.state}</small> : ""}
            </div>
            <div className="form-group col-lg-4">
              <label htmlFor="noOfDependents">No of Dependents</label>
              <input
                type="text"
                className="form-control"
                id="noOfDependents"
                name="noOfDependents"
                onChange={handleOnChange}
                value={values.noOfDependents ?? ""}
              />
              {errors.noOfDependents ? <small className="text-danger">{errors.noOfDependents}</small> : ""}
            </div>
          </div>
          <button type="submit" className="Next_Button">
            Next Step
          </button>
        </div>
      </form>
    </>
  );
};

export default StepOne;
