import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { CLOCK_IN, CLOCK_OUT } from "../utils/mutations";
import Calendar from "../components/Calendar";
import SidePanel from "../components/SidePanel";
import ClockNotification from "../components/ClockNotification";

const EmployeePage = () => {
  const [notification, setNotification] = useState(null);
  const [lastClockInTime, setLastClockInTime] = useState(null);

  useEffect(() => {
    setNotification(null);
  }, []);

  const { loading, data, refetch } = useQuery(QUERY_ME);
  const user = data?.me || {};

  const [clockIn] = useMutation(CLOCK_IN, {
    onCompleted: () => {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      setLastClockInTime(currentTime);
      setNotification(`You have clocked in at ${formattedTime}.`);
    },
    onError: (error) => {
      console.error("Error clocking in:", error);
      setNotification("Error clocking in.");
    },
  });

  const [clockOut] = useMutation(CLOCK_OUT, {
    onCompleted: () => {
      const currentTime = new Date();
      const formattedTime = currentTime.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      refetch();
      setNotification(`You have clocked out at ${formattedTime}.`);
    },
    onError: (error) => {
      console.error("Error clocking out:", error);
      setNotification(`Error: ${error.message}`);
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
      const currentTime = new Date();
      if (lastClockInTime && (currentTime - lastClockInTime) < 5 * 60 * 1000) {
        setNotification("You must wait at least 5 minutes before clocking out.");
        return;
      }
      await clockOut({ variables: { userId: user._id } });
    } catch (error) {
      setNotification(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container-fluid">
      {notification && (
        <ClockNotification message={notification} onClose={() => setNotification(null)} type={notification.startsWith("You have clocked in") ? "success" : "error"} />
      )}
      <div className="row flex-nowrap">
        <Col xs={2} className="p-0">
          <SidePanel />
        </Col>
        <Col xs={9} className="py-3 content-col">
          <Container className="text-center mt-4 bg-light">
            <h3 className="text-dark">
              Welcome {Auth.getProfile().authenticatedPerson.username}!
            </h3>
            <p className="fs-6 lead">
              View your Daily Analytics on the content below.
            </p>
            <Calendar />
          </Container>

          <Row className="justify-content-center mt-4">
            <Col xs={12} sm={6} md={3} className="d-flex justify-content-center mb-3">
              <div className="card bg-light d-flex justify-content-center align-items-center">
                {user.clockedIn ? (
                  <Link to="#" className="link" onClick={handleClockOut}>
                    <i className="fa-solid fa-clock-rotate-left fs-1 mb-1"></i>
                    <div className="fs-5 lead">Clock-Out</div>
                  </Link>
                ) : (
                  <Link to="#" className="link" onClick={handleClockIn}>
                    <i className="fa-solid fa-clock-rotate-left fs-1 mb-1"></i>
                    <div className="fs-5 lead">Clock-In</div>
                  </Link>
                )}
              </div>
            </Col>
            <Col xs={12} sm={6} md={3} className="d-flex justify-content-center mb-3">
              <div className="card bg-light d-flex justify-content-center align-items-center">
                <Link to="/logs" className="link">
                  <i className="fa-regular fa-folder-closed fs-1 mb-1"></i>
                  <div className="fs-5 lead">Logs</div>
                </Link>
              </div>
            </Col>
            <Col xs={12} sm={6} md={3} className="d-flex justify-content-center mb-3">
              <div className="card bg-light d-flex justify-content-center align-items-center">
                <Link to="/request-time-off" className="link">
                  <i className="fa-regular fa-clipboard fs-1 mb-1"></i>
                  <div className="fs-5 lead">Request Time-off</div>
                </Link>
              </div>
            </Col>
            <Col xs={12} sm={6} md={3} className="d-flex justify-content-center mb-3">
              <div className="card bg-light d-flex justify-content-center align-items-center">
                <div className="category text-center">
                  <Link to="/view-profile" className="link">
                    <i className="fa-solid fa-gears fs-1 mb-1"></i>
                    <div className="fs-5 lead">View Profile</div>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </div>
    </div>
  );
};

export default EmployeePage;
