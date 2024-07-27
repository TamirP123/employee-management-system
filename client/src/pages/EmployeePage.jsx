import React, { useEffect, useState } from "react";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { CLOCK_IN, CLOCK_OUT } from "../utils/mutations";
import Calendar from "../components/Calendar";
import EmployeeList from "../components/EmployeeList";
import SidePanel from "../components/SidePanel";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import ClockNotification from "../components/ClockNotification";

const EmployeePage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { loading, data, refetch } = useQuery(QUERY_ME);
  const user = data?.me || {};

  const [clockIn] = useMutation(CLOCK_IN, {
    onCompleted: () => {
      refetch();
      setNotification("You have clocked in.");
    },
    onError: (error) => {
      console.error("Error clocking in:", error);
      setNotification("Error clocking in.");
    },
  });

  const [clockOut] = useMutation(CLOCK_OUT, {
    onCompleted: () => {
      refetch();
      setNotification("You have clocked out.");
    },
    onError: (error) => {
      console.error("Error clocking out:", error);
      setNotification("Error clocking out.");
    },
  });

  const handleClockIn = async () => {
    try {
      await clockIn({ variables: { userId: user._id } });
    } catch (error) {
      console.error("Error clocking in:", error);
    }
  };

  const handleClockOut = async () => {
    try {
      await clockOut({ variables: { userId: user._id } });
    } catch (error) {
      console.error("Error clocking out:", error);
    }
  };

  return (
    <div className="container-fluid">
      {notification && (
        <ClockNotification message={notification} onClose={() => setNotification(null)} />
      )}
      <div className="row flex-nowrap">
        <div className="col-2">
          <SidePanel />
        </div>
        <div className="col-10 py-3">
          <Navbar bg="light" variant="dark" expand="lg">
            <Container>
              <Calendar />
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

            <p className="fs-6 text-start mx-4 lead">
              View your Daily Analytics on the content below.
            </p>

            <div className="row">
              <div className="col-3 mt-4">
                <div className="card bg-light d-flex justify-content-center align-items-center">
                  <div className="category text-center">
                    {user.clockedIn ? (
                      <Link to="#" className="link" style={{ textDecoration: "none" }} onClick={handleClockOut}>
                        <i className="fa-solid fa-clock-rotate-left fs-1 mb-1"></i>
                        <div className="fs-5 lead">Clock-Out</div>
                      </Link>
                    ) : (
                      <Link to="#" className="link" style={{ textDecoration: "none" }} onClick={handleClockIn}>
                        <i className="fa-solid fa-clock-rotate-left fs-1 mb-1"></i>
                        <div className="fs-5 lead">Clock-In</div>
                      </Link>
                    )}
                  </div>
                </div>
              </div>

              <div className="col-3 mt-4">
                <div className="card bg-light d-flex justify-content-center align-items-center">
                  <div className="category text-center">
                    <i className="fa-regular fa-folder-closed fs-1 mb-1"></i>
                    <div className="fs-5 lead">Logs</div>
                  </div>
                </div>
              </div>

              <div className="col-3 mt-4">
                <div className="card bg-light d-flex justify-content-center align-items-center">
                  <div className="category text-center">
                    <i className="fa-regular fa-clipboard fs-1 mb-1"></i>
                    <div className="fs-5 lead">Request Time-off</div>
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

          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeePage;
