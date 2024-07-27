import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import SidePanel from "../components/SidePanel";
import EmployeeList from "../components/EmployeeList";


const EmployeeDashboard = () => {

  if (Auth.loggedIn() === true && Auth.getProfile().authenticatedPerson.isAdmin === true) {
    return (
        <div className="container-fluid">
        <div class="row flex-nowrap">
          <div className="col-2">
            <SidePanel />
          </div>
          <div className="col-10">
            <EmployeeList />
          </div>
          
        </div>
      </div>
    );
  } else {

   return (
    <h1>You do not have permissions to this page!</h1>
  )
}
};

export default EmployeeDashboard;
