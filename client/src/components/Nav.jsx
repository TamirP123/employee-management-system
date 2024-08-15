import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import '../styles/navbar.css';

const Nav = () => {
  return (
    <div className="navbar bg-light navbar-container">
  <img src={logo} alt="Logo" className="navbar-logo" />

  <Link to="/" style={{ textDecoration: "none" }}>
    <h3 className="navbar-title">Employee Bubble</h3>
  </Link>
</div>
  );
};

export default Nav;
