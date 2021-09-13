import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/images/Logo.svg";

const Header = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container Header">
          <img src={Logo} alt="logo" />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="true"
            aria-label="Toggle navigation"
            onClick={() => setToggle(!toggle)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className={`collapse navbar-collapse ${toggle ? "show" : ""}`}
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link" aria-current="page" href="#1">
                  About us
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" id="link" href="#1">
                  Quote in 60 Seconds
                </a>
              </li>
            </ul>
            <form className="d-flex">
              <Link to="/login">
                <button className="Login"> Login</button>
              </Link>
              <button
                className="btn btn-outline-success Contact_Us"
                type="submit"
              >
                Contact us
              </button>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
