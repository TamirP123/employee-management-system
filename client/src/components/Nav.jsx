import React from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import logo from "../assets/logo.png";
import '../styles/navbar.css';

const Nav = () => {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };
  return (
    <div className="navbar bg-light">
      <img src={logo} alt="Logo" className="navbar-logo" />

      <Link to="/" style={{ textDecoration: "none" }}>
        <h3 className="navbar-title">Employee Bubble</h3>
      </Link>
      <div>
        {Auth.loggedIn() ? (
          <div>
            <Link className="profilebtn btn-lg m-3" to="/me">
              <path
                transform="translate(0 0)"
                d="M8.752,15.625h0L1.383,8.162a4.824,4.824,0,0,1,0-6.762,4.679,4.679,0,0,1,6.674,0l.694.7.694-.7a4.678,4.678,0,0,1,6.675,0,4.825,4.825,0,0,1,0,6.762L8.752,15.624ZM4.72,1.25A3.442,3.442,0,0,0,2.277,2.275a3.562,3.562,0,0,0,0,5l6.475,6.556,6.475-6.556a3.563,3.563,0,0,0,0-5A3.443,3.443,0,0,0,12.786,1.25h-.01a3.415,3.415,0,0,0-2.443,1.038L8.752,3.9,7.164,2.275A3.442,3.442,0,0,0,4.72,1.25Z"
                id="Fill"
              ></path>
              {Auth.getProfile().authenticatedPerson.username}
            </Link>

            <button className="" onClick={logout}>
              Logout
            </button>
          </div>
        ) : (
          <>
            <div className="menu">
              <div className="item">
                <a className="link">
                  <span> Login </span>
                  <svg viewBox="0 0 360 360" xml:space="preserve">
                    <g id="SVGRepo_iconCarrier">
                      <path
                        id="XMLID_225_"
                        d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
                      ></path>
                    </g>
                  </svg>
                </a>
                <div className="submenu">
                  <div className="submenu-item">
                    <Link
                      className="admin-link"
                      to="/login"
                      style={{ textDecoration: "none" }}
                    >
                      Administrator
                    </Link>
                  </div>
                  <div className="submenu-item">
                    <Link
                      className="employee-link"
                      to="/login"
                      style={{ textDecoration: "none" }}
                    >
                      Employee
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Nav;
