import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import Logo from "../../assets/images/Logo.svg";
import { db, auth } from "../../config/firestore";
import { Encrypt } from "./../../config/common";
const Login = () => {
  const history = useHistory();
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [loader, setLoader] = useState(false);
  const handleLoginSubmit = async event => {
    event.preventDefault();
    if (!formValidate()) {
      return false;
    }
    setLoader(true);
    try {
      const res = await auth.signInWithEmailAndPassword(values.email, values.password);
      const userInfo = res.user;
      const response = await db
        .collection("users")
        .doc(userInfo.uid)
        .get();
      const user = { ...response.data(), _id: userInfo.uid };
      const token = Encrypt(user);
      localStorage.setItem("_securioToken", token);
      history.push(`/profile`);
      setLoader(false);
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.dark("User not found!");
      } else if (error.code === "auth/wrong-password") {
        toast.dark("Invalid username and password!");
      }
      console.error(error);
      setLoader(false);
    }
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
  };

  /**
   * Form validation of login form
   */
  const formValidate = () => {
    let isValid = true;
    setErrors({});
    let fieldList = ["email", "password"];

    for (let x of fieldList) {
      if (!values[x]) {
        isValid = false;
        setErrors(errors => ({
          ...errors,
          [x]: "Above field is required."
        }));
      }
    }
    return isValid;
  };
  return (
    <div className="login vh-100">
      <div className="row g-0 h-100">
        <div className="col-md-6 d-none d-md-block">
          <div className="bg-img h-100">
            <div className="content px-2">
              <h1 className="display-1 text-uppercase mb-4 text-white">Sign in</h1>
              <p>Lorem Ipsum is simply dummy text of the printing and typesetting</p>
            </div>
          </div>
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <form onSubmit={handleLoginSubmit}>
            <div className="form px-3">
              <Link to="/" className="mb-5 d-block text-center">
                <img src={Logo} alt="" />
              </Link>
              <h2 className="display-2 fw-light mb-4 text-center">Welcome to Securio</h2>
              <div className="mb-3">
                <input type="email" className="form-control" placeholder="Email" name="email" onChange={handleOnChange} />
                {errors.email ? <small className="text-danger">{errors.email}</small> : ""}
              </div>
              <div className="mb-4">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Password"
                  name="password"
                  onChange={handleOnChange}
                />
                {errors.password ? <small className="text-danger">{errors.password}</small> : ""}
              </div>
              <div className="mb-4">
                <Link to="#" className="d-inline-block text-dark">
                  Forgot password ?
                </Link>
              </div>
              <button type="submit" className="btn btn-dark w-100 fw-bold" disabled={loader}>
                {loader ? <i className="fa fa-spinner fa-spin" /> : ""} Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
