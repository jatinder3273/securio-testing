import React from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import Logo from "../assets/images/Logo.svg";

const Sidebar = ({ show, onToggle }) => {
  const history = useHistory();
  const navLinks = [
    {
      name: "Dashboard",
      icon: "dashboard",
      link: "/dashboard"
    },
    {
      name: "Profile",
      icon: "profile",
      link: "/profile"
    },
    {
      name: "Policy",
      icon: "policy",
      link: "/policy"
    },
    {
      name: "Settings",
      icon: "settings",
      link: "/settings"
    },
    {
      name: "Cyber Wellness Services",
      icon: "cyber-wellness-services",
      link: "/cyber-wellness-services"
    },
    {
      name: "Claims",
      icon: "claims",
      link: "/claims"
    }
  ];
  const handleLogout = event => {
    event.preventDefault();
    localStorage.removeItem("_securioToken");
    history.push(`/login`);
  };

  return (
    <aside className={`${show && "show"}`}>
      {show && (
        <button className="btn btn-dark btn-sm position-fixed d-md-none" onClick={onToggle} style={{ right: 0 }}>
          Close
        </button>
      )}
      <div className={`sidebar ${show && "show"}`}>
        <div className="logo bg-white p-4">
          <Link to="/" className="d-inline-block">
            <img src={Logo} alt="" />
          </Link>
        </div>
        <div className="navs pt-5">
          <ul className="nav px-2">
            {navLinks.map((link, index) => (
              <li className="w-100 mb-3" key={index}>
                <NavLink to={link.link} className="d-block p-2 text-white">
                  <span className="d-inline-block" style={{ width: 30 }}>
                    <img src={require(`../assets/images/${link.icon}.svg`).default} alt="" />
                  </span>
                  <span>{link.name}</span>
                </NavLink>
              </li>
            ))}
            <li className="w-100 mb-3">
              <a href="#!" onClick={handleLogout} className="d-block p-2 text-white">
                <span className="d-inline-block" style={{ width: 30 }}>
                  <img src={require(`../assets/images/logout.svg`).default} alt="" />
                </span>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
