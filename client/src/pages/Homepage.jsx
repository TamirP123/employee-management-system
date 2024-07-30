import Hero from "../components/Hero";
import Nav from "../components/Nav";
import Auth from "../utils/auth";
import AdminPage from "./AdminPage";
import EmployeePage from "./EmployeePage";


const EmployeeDashboard = () => {
  
  // If user is not an admin, return employee page.
  if (Auth.loggedIn() === true && Auth.getProfile().authenticatedPerson.isAdmin === false) {
    return (
      <div className="homepageContain">
        <EmployeePage />
      </div>
    );
  }
  // If user is an admin, return admin page.
  if (Auth.loggedIn() === true && Auth.getProfile().authenticatedPerson.isAdmin === true) {
    return (
      <div className="homepageContain">
        <AdminPage />
      </div>
    );
  }
  // Return nav and hero
  return (
    <div>
        <Nav/>
        <Hero/>

    </div>
  );
};

export default EmployeeDashboard;
