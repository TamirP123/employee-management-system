import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useQuery } from "@apollo/client";
import Hero from "../components/Hero";
import Auth from "../utils/auth";
import AdminPage from "./AdminPage";


const Homepage = () => {
  
  if (Auth.loggedIn() === true && Auth.getProfile().authenticatedPerson.isAdmin === false) {
    return (
      <div className="homepageContain">
        <div>
          <div className="mb-3 text-center">
            <h2 className=" p-3 mb-5">
              Employee Dashboard
            </h2>
          
          </div>
        </div>
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
    
        <Hero/>

    </div>
  );
};

export default Homepage;
