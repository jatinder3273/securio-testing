import React, { useEffect, useState } from "react";
import { Decrypt } from "../../config/common";
import { db } from "../../config/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";

const Profile = () => {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);

  /**
   * Get current User Info
   */
  const getUserInfo = async () => {
    setLoader(true);
    try {
      const userData = Decrypt(localStorage.getItem("_securioToken"));
      const response = await db
        .collection("users")
        .doc(userData._id)
        .get();
      patchData(response.data());
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
    }
  };
  /**
   * Patch Data with form
   * @param {ResponseData} data
   */
  const patchData = data => {
    setValues(values => ({ ...values, name: `${data.firstName} ${data.lastName}`, dob: new Date(moment(data.dob, "L")) }));
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
  useEffect(() => {
    getUserInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <React.Fragment>
      <div className="heading mb-4">
        <h2>Profile</h2>
      </div>
      <form>
        <div className="row">
          <div className="col-lg-6 mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" name="name" disabled={loader} value={values.name || ""} />
            {errors.name ? <small className="text-danger">{errors.name}</small> : ""}
          </div>
          <div className="col-lg-6 mb-5">
            <label className="form-label">Date of birth</label>
            <DatePicker className="form-control"
              selected={values.dob}
              onChange={date => handleDobEvent(date)}
              maxDate={new Date(moment().subtract(1, 'days'))} 
              dateFormat='dd/MM/yyyy'
              />
            {errors.dob ? <small className="text-danger">{errors.dob}</small> : ""}
          </div>
          <div className="d-flex justify-content-end">
            <button className="btn btn-dark" style={{ minWidth: 160 }} disabled={loader}>
              {loader ? <i className="fa fa-spinner fa-spin" /> : ""} Save
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default Profile;
