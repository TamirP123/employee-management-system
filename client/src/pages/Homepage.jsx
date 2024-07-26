import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useQuery } from "@apollo/client";
import Hero from "../components/Hero";
import Nav from "../components/Nav";
import Auth from "../utils/auth";
import AdminPage from "./AdminPage";
import EmployeePage from "./EmployeePage";


const EmployeeDashboard = () => {
  
  if (Auth.loggedIn() === true && Auth.getProfile().authenticatedPerson.isAdmin === false) {
    return (
      <div className="homepageContain">
        <EmployeePage />
      </div>
    );
  }
  if (Auth.loggedIn() === true && Auth.getProfile().authenticatedPerson.isAdmin === true) {
    return (
      <div className="homepageContain">
        <AdminPage />
      </div>
    );
  }
  return (
    <div>
        <Nav/>
        <Hero/>

    </div>
  );
};

export default EmployeeDashboard;
