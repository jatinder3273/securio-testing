import React from "react";

const StepTwo = ({ handleSubmit, handleOnChange, values, errors }) => {
  return (
    <>
      <form onSubmit={e => handleSubmit(e, "third")}>
        <div className="Heading_Welcome">
          <h2>Customer’s desired coverage options</h2>
        </div>
        <div className="First_Selection">
          <h5>First Selection</h5>
        </div>
        <div className="row col-sm-12 col-md-12 col-lg-12">
          <div className="col-sm-3 col-md-4 col-lg-3">
            <div className="card mt-3">
              <div
                className={`card-body checkbox-custom ${
                  values.desiredCoverage ? (values.desiredCoverage.indexOf("Cyber Extortion") !== -1 ? "active" : "") : ""
                }`}
              >
                <label className="form-check-label" htmlFor="Cyber">
                  Cyber Extortion
                  <input
                    className="form-check-input checkbox"
                    name="desiredCoverage"
                    type="checkbox"
                    value="Cyber Extortion"
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
                  values.desiredCoverage ? (values.desiredCoverage.indexOf("Cyber Fraud") !== -1 ? "active" : "") : ""
                }`}
              >
                <label className="form-check-label" htmlFor="Fraud">
                  Cyber Fraud
                  <input
                    className="form-check-input checkbox"
                    name="desiredCoverage"
                    type="checkbox"
                    value="Cyber Fraud"
                    id="Fraud"
                    onChange={handleOnChange}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-md-4 col-lg-3">
            <div className="card mt-3 ">
              <div
                className={`card-body checkbox-custom ${
                  values.desiredCoverage
                    ? values.desiredCoverage.indexOf("Cyber Breach of Privacy") !== -1
                      ? "active"
                      : ""
                    : ""
                }`}
              >
                <label className="form-check-label" htmlFor="Breach">
                  Cyber Breach of Privacy
                  <input
                    className="form-check-input checkbox"
                    name="desiredCoverage"
                    type="checkbox"
                    value="Cyber Breach of Privacy"
                    id="Breach"
                    onChange={handleOnChange}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row col-sm-12 col-md-12 col-lg-12">
          <div className="col-sm-3 col-md-4 col-lg-3">
            <div className="card mt-3 ">
              <div
                className={`card-body checkbox-custom ${
                  values.desiredCoverage ? (values.desiredCoverage.indexOf("Cyber Bullying") !== -1 ? "active" : "") : ""
                }`}
              >
                <label className="form-check-label" htmlFor="Bullying">
                  Cyber Bullying
                  <input
                    className="form-check-input checkbox"
                    name="desiredCoverage"
                    type="checkbox"
                    value="Cyber Bullying"
                    id="Bullying"
                    onChange={handleOnChange}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-md-4 col-lg-3">
            <div className="card mt-4 ">
              <div
                className={`card-body checkbox-custom ${
                  values.desiredCoverage ? (values.desiredCoverage.indexOf("Identity Theft") !== -1 ? "active" : "") : ""
                }`}
              >
                <label className="form-check-label" htmlFor=" Theft">
                  Identity Theft
                  <input
                    className="form-check-input checkbox"
                    name="desiredCoverage"
                    type="checkbox"
                    value="Identity Theft"
                    id=" Theft"
                    onChange={handleOnChange}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-md-4 col-lg-3">
            <div className="card mt-4 ">
              <div
                className={`card-body checkbox-custom ${
                  values.desiredCoverage
                    ? values.desiredCoverage.indexOf("Electronic Data Restoration") !== -1
                      ? "active"
                      : ""
                    : ""
                }`}
              >
                <label className="form-check-label" htmlFor="Restoration">
                  Electronic Data Restoration
                  <input
                    className="form-check-input checkbox"
                    name="desiredCoverage"
                    type="checkbox"
                    value="Electronic Data Restoration"
                    id="Restoration"
                    onChange={handleOnChange}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="row col-sm-12 col-md-12 col-lg-12">
          <div className="col-sm-3 col-md-4 col-lg-3">
            <div className="card mt-4 ">
              <div
                className={`card-body checkbox-custom ${
                  values.desiredCoverage
                    ? values.desiredCoverage.indexOf("Electronic Device Replacement") !== -1
                      ? "active"
                      : ""
                    : ""
                }`}
              >
                <label className="form-check-label" htmlFor="Device">
                  Electronic Device Replacement
                  <input
                    className="form-check-input checkbox"
                    name="desiredCoverage"
                    type="checkbox"
                    value="Electronic Device Replacement"
                    id="Device"
                    onChange={handleOnChange}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
          </div>
          {errors.desiredCoverage ? <small className="text-danger mt-3">{errors.desiredCoverage}</small> : ""}
        </div>
        <button className="Next_Button" type="submit">
          Next
        </button>
      </form>
    </>
  );
};

export default StepTwo;
