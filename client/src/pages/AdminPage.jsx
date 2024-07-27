import React, { useEffect, useState } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import Calendar from "../components/Calendar";
import Auth from "../utils/auth";
import EmployeeList from "../components/EmployeeList";
import SidePanel from "../components/SidePanel";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart"

const AdminPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="container-fluid">
      <div class="row flex-nowrap">
        <div className="col-2">
          <SidePanel />
        </div>
        <div class="col-10 py-3">
          <Navbar bg="light" variant="dark" expand="lg">
            <Container>
              <Calendar></Calendar>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto"></Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <div className="py-3">
            <h3 className="text-start mx-4 col-auto text-dark">
              Welcome {Auth.getProfile().authenticatedPerson.username}!
            </h3>

            <p class="fs-6 text-start mx-4 lead">
              View your Daily Analytics on the content below.
            </p>

            <div className="row">
              <div className="col-3 mt-4">
                <div className="card bg-light d-flex justify-content-center align-items-center">
                  <div className="category text-center">
                <Link to="/employees" className="link" style={{ textDecoration: "none" }}>
                    <i className="fa-regular fa-user fs-1 mb-1"></i>
                    <div className="fs-5 lead">Employees</div>
                </Link>
                  </div>
                </div>
              </div>

              <div className="col-3 mt-4">
                <div className="card bg-light d-flex justify-content-center align-items-center">
                  <div className="category text-center">
                  <Link to="/logs" className="link" style={{ textDecoration: "none" }}>
                    <i className="fa-regular fa-folder-closed fs-1 mb-1"></i>
                    <div className="fs-5 lead">Logs</div>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="col-3 mt-4">
                <div className="card bg-light d-flex justify-content-center align-items-center">
                  <div className="category text-center">
                    <i className="fa-regular fa-clipboard fs-1 mb-1"></i>
                    <div className="fs-5 lead">Time-off Requests</div>
                  </div>
                </div>
              </div>

              <div className="col-3 mt-4">
                <div className="card bg-light d-flex justify-content-center align-items-center">
                  <div className="category text-center">
                    <i className="fa-solid fa-gears fs-1 mb-1"></i>
                    <div className="fs-5 lead text">Settings</div>
                  </div>
                </div>
              </div>
            </div>

            
    <div className="row d-flex justify-content-center align-items-center">
      <div className="col-8 performance-card bg-light mt-5">
        <h3 className="text-start mx-2 mt-3 fs-4">Performance</h3>
        <table className="table mt-4">
          <thead>
            <tr>
              <th scope="col">Department</th>
              <th scope="col">Percentage</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="align-middle">Developers</td>
              <td>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: '80%' }}
                    aria-valuenow="80"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    80%
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-middle">Marketing</td>
              <td>
                <div className="progress">
                  <div
                    className="progress-bar bg-primary"
                    role="progressbar"
                    style={{ width: '65%' }}
                    aria-valuenow="65"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    65%
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td className="align-middle">Sales</td>
              <td>
                <div className="progress">
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: '45%' }}
                    aria-valuenow="45"
                    aria-valuemin="0"
                    aria-valuemax="100"
                  >
                    45%
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    <div className="row">
      <LineChart/>
      <PieChart/>
    </div>
    </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
