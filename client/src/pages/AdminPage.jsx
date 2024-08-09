import React, { useEffect, useState } from "react";
import { Container, Grid, Paper, Typography } from "@mui/material";
import { Row, Col, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import Calendar from "../components/Calendar";
import Auth from "../utils/auth";
import SidePanel from "../components/SidePanel";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import PerformanceChart from "../components/PerformanceChart";

const AdminPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SidePanel />
      <div style={{ flexGrow: 1, padding: '16px' }}>
        <Navbar bg="light" variant="dark" expand="lg">
          <Container>
            <Calendar />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto"></Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div style={{ margin: '16px 0' }}>
          <Typography variant="h6" align="left">
            Welcome {Auth.getProfile().authenticatedPerson.username}!
          </Typography>
          <Typography variant="body1">
            View your Daily Analytics on the content below.
          </Typography>
        </div>

        {/* Cards */}
        <div className="row mb-5 mx-5">
              <div className="col-3 mt-4">
                <div className="card bg-light d-flex justify-content-center align-items-center">
                  <Link to="/employees" className="hover-link">
                    <i className="fa-regular fa-user fs-1 mb-1"></i>
                    <div className="fs-5 lead">Employees</div>
                  </Link>
                </div>
              </div>

              <div className="col-3 mt-4">
                <div className="card bg-light d-flex justify-content-center align-items-center">
                  <Link to="/logs" className="hover-link">
                    <i className="fa-regular fa-folder-closed fs-1 mb-1"></i>
                    <div className="fs-5 lead">Logs</div>
                  </Link>
                </div>
              </div>

              <div className="col-3 mt-4">
                <div className="card bg-light d-flex justify-content-center align-items-center">
                  <Link to="/time-off-requests" className="hover-link">
                    <i className="fa-regular fa-clipboard fs-1 mb-1"></i>
                    <div className="fs-5 lead">Time-off Requests</div>
                  </Link>
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
            
        {/* Charts */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <PerformanceChart />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <LineChart />
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper elevation={3} style={{ padding: '16px' }}>
              <PieChart />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default AdminPage;
