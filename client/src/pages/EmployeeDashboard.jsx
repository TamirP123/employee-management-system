import Auth from "../utils/auth";
import SidePanel from "../components/SidePanel";
import EmployeeList from "../components/EmployeeList";


const EmployeeDashboard = () => {

  if (Auth.loggedIn() === true && Auth.getProfile().authenticatedPerson.isAdmin === true) {
    return (
        <div className="container-fluid">
        <div className="row flex-nowrap">
          <div className="col-2">
            <SidePanel />
          </div>
          <div className="col-9">
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
