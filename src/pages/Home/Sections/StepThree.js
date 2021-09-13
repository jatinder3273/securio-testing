import React from "react";

const StepThree = ({ handleSubmit, handleOnChange, values, errors }) => {
  return (
    <>
      <form onSubmit={e => handleSubmit(e, "forth")}>
        <div className="Heading_Welcome">
          <h2>Customer’s desired coverage options</h2>
        </div>
        <div className="First_Selection">
          <h5>Choose Coverage</h5>
        </div>
        <div className="row col-sm-12 col-md-12 col-lg-12">
          <div className="col-sm-3 col-md-4 col-lg-3">
            <div className="card mt-3">
              <div
                className={`card-body radio-custom ${
                  values.coverageLimit ? (values.coverageLimit.indexOf("10000") !== -1 ? "active" : "") : ""
                }`}
              >
                <label className="form-check-label" htmlFor="limit-one">
                  Coverage Limit of $10,000
                  <input
                    className="form-check-input radio"
                    type="radio"
                    value="10000"
                    name="coverageLimit"
                    onChange={handleOnChange}
                    id="limit-one"
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
          </div>
          <div className="col-sm-3 col-md-4 col-lg-3">
            <div className="card mt-3">
              <div
                className={`card-body radio-custom ${
                  values.coverageLimit ? (values.coverageLimit.indexOf("25000") !== -1 ? "active" : "") : ""
                }`}
              >
                <label className="form-check-label" htmlFor="limit-two">
                  Coverage Limit of $25,000
                  <input
                    className="form-check-input radio"
                    type="radio"
                    name="coverageLimit"
                    onChange={handleOnChange}
                    id="limit-two"
                    value="25000"
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
          </div>
          {/* <div className="col-sm-3 col-md-4 col-lg-3">
            <div className="card mt-3">
              <div
                className={`card-body radio-custom ${
                  values.coverageLimit ? (values.coverageLimit.indexOf("50000") !== -1 ? "active" : "") : ""
                }`}
              >
                <label className="form-check-label" htmlFor="limit-three">
                  Coverage Limit of $50,000
                  <input
                    className="form-check-input radio"
                    type="radio"
                    name="coverageLimit"
                    onChange={handleOnChange}
                    id="limit-three"
                    value="50000"
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
          </div> */}
          {errors.coverageLimit ? <small className="text-danger mt-3">{errors.coverageLimit}</small> : ""}
        </div>
        <button type="submit" className="Next_Button">
          Next
        </button>
      </form>
    </>
  );
};

export default StepThree;
