import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from "../assets/logo.png";

const Sidebar = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };

  const [collapsed, setCollapsed] = useState(true);

  const handleToggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const sidebarStyle = {
    width: collapsed ? '80px' : '250px',
    transition: 'width 0.3s',
    background: '#f8f9fa',
    color: 'gray',
    height: '100vh',
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
  };

  const menuItemStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '10px 20px',
  };

  if (Auth.loggedIn() === true && Auth.getProfile().authenticatedPerson.isAdmin === false) {
    return (
      <div className="sticky-top">
      <div className="sidebar" style={{ display: 'flex', height: '100vh' }}>
        <div style={sidebarStyle} className="d-flex flex-column">
          <div style={menuItemStyle} onClick={handleToggleSidebar}>
            <i className="fas fa-bars"></i>
            {!collapsed && (
              <span style={{ marginLeft: '43px' }}>
                <img src={logo} alt="Logo" className="sidebar-logo" />
              </span>
            )}
          </div>
          <Menu iconShape="square" className="flex-grow-1">
          <Link to="/" style={{ textDecoration: "none", color: 'gray' }}>
            <MenuItem icon={<i className="fas fa-tachometer-alt"></i>}>Dashboard</MenuItem>
            </Link>
            <SubMenu label="Requests" icon={<i className="fa-solid fa-user-plus"></i>}>
            <Link to="/view-requests" style={{ textDecoration: "none", color: 'gray' }}>
              <MenuItem>View Requests</MenuItem>
              </Link>
              <Link to="/create-employee" style={{ textDecoration: "none", color: 'gray' }}>
              <MenuItem>Add Request</MenuItem>
              </Link>
            </SubMenu>
            <MenuItem icon={<i className="fas fa-project-diagram"></i>}>View Status</MenuItem>
          </Menu>
          <div className="mt-auto">
            <Menu iconShape="square">
              <MenuItem icon={<i className="fas fa-sign-out-alt"></i>} onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', padding: '10px' }}>
        </div>
      </div>
    </div>
    );
  }
  // If user is an admin, return admin page.
  if (Auth.loggedIn() === true && Auth.getProfile().authenticatedPerson.isAdmin === true) {
    return (
      <div className="sticky-top">
      <div className="sidebar" style={{ display: 'flex', height: '100vh' }}>
        <div style={sidebarStyle} className="d-flex flex-column">
          <div style={menuItemStyle} onClick={handleToggleSidebar}>
            <i className="fas fa-bars"></i>
            {!collapsed && (
              <span style={{ marginLeft: '43px' }}>
                <img src={logo} alt="Logo" className="sidebar-logo" />
              </span>
            )}
          </div>
          <Menu iconShape="square" className="flex-grow-1">
          <Link to="/" style={{ textDecoration: "none", color: 'gray' }}>
            <MenuItem icon={<i className="fas fa-tachometer-alt"></i>}>Dashboard</MenuItem>
            </Link>
            <SubMenu label="Users" icon={<i className="fas fa-user"></i>}>
              <MenuItem>View Employees</MenuItem>
              <Link to="/create-employee" style={{ textDecoration: "none", color: 'gray' }}>
              <MenuItem>Create Employee</MenuItem>
              </Link>
            </SubMenu>
            <MenuItem icon={<i className="fas fa-project-diagram"></i>}>Requests</MenuItem>
          </Menu>
          <div className="mt-auto">
            <Menu iconShape="square">
              <MenuItem icon={<i className="fas fa-sign-out-alt"></i>} onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        </div>
        <div style={{ marginLeft: 'auto', padding: '10px' }}>
        </div>
      </div>
    </div>
    );
  }

};

export default Sidebar;
