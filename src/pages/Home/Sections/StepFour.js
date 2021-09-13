import React from "react";
const StepFour = ({ handleSubmit, handleOnChange, values, errors }) => {
  return (
    <>
      <form onSubmit={e => handleSubmit(e, "last")}>
        <div className="Heading_Welcome">
          <h2>Customer’s desired coverage options</h2>
        </div>
        <div className="First_Selection">
          <h5>Premium Add ons</h5>
        </div>
        <div className="row col-sm-12 col-md-12 col-lg-12">
          <div className="col-sm-3 col-md-4 col-lg-3">
            <div className="card mt-3">
              <div
                className={`card-body checkbox-custom ${
                  values.premiumAddOn ? (values.premiumAddOn.indexOf("Cyber breach monitoring") !== -1 ? "active" : "") : ""
                }`}
              >
                <label className="form-check-label" htmlFor="Cyber">
                  Cyber breach monitoring
                  <input
                    className="form-check-input checkbox"
                    type="checkbox"
                    value="Cyber breach monitoring"
                    name="premiumAddOn"
                    id="Cyber"
                    onChange={handleOnChange}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-md-4 col-lg-3">
            <div className="card mt-3">
              <div
                className={`card-body checkbox-custom ${
                  values.premiumAddOn ? (values.premiumAddOn.indexOf("Password manager") !== -1 ? "active" : "") : ""
                }`}
              >
                <label className="form-check-label" htmlFor="Fraud">
                  Password manager
                  <input
                    className="form-check-input checkbox"
                    type="checkbox"
                    value="Password manager"
                    name="premiumAddOn"
                    id="Fraud"
                    onChange={handleOnChange}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-md-4 col-lg-3">
            <div className="card mt-3">
              <div
                className={`card-body checkbox-custom ${
                  values.premiumAddOn
                    ? values.premiumAddOn.indexOf("Ransom negotiation assistance") !== -1
                      ? "active"
                      : ""
                    : ""
                }`}
              >
                <label className="form-check-label" htmlFor="Breach">
                  Ransom negotiation assistance
                  <input
                    className="form-check-input checkbox"
                    type="checkbox"
                    value="Ransom negotiation assistance"
                    name="premiumAddOn"
                    id="Breach"
                    onChange={handleOnChange}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
          </div>
          {errors.premiumAddOn ? <small className="text-danger mt-3">{errors.premiumAddOn}</small> : ""}
        </div>
        {/* <Link to="/package"> */}
        <button type="submit" className="Next_Button">
          Submit
        </button>
        {/* </Link> */}
      </form>
    </>
  );
};

export default StepFour;
