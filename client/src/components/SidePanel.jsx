import React, { useState } from 'react';
import { Link } from "react-router-dom";
import Auth from "../utils/auth";
import { Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import logo from "../assets/logo.png";
import '../styles/sidebar.css';

const Sidebar = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };

    const [collapsed, setCollapsed] = useState(true);

    const handleToggleSidebar = () => {
        setCollapsed(!collapsed);
    };

    return (
        <div className={`sidebar ${collapsed ? 'collapsed' : 'expanded'} sticky-top`}>
            <div className="menu-item" onClick={handleToggleSidebar}>
                <i className="fas fa-bars"></i>
                {!collapsed && <span><img src={logo} alt="Logo" className="sidebar-logo" /></span>}
            </div>
            <div className="sidebar-content">
                <Menu iconShape="square">
                    <Link to="/" style={{ textDecoration: "none", color: 'gray' }}>
                        <MenuItem icon={<i className="fas fa-tachometer-alt"></i>}>Dashboard</MenuItem>
                    </Link>
                    {Auth.loggedIn() && !Auth.getProfile().authenticatedPerson.isAdmin && (
                        <SubMenu label="Requests" icon={<i className="fa-solid fa-user-plus"></i>}>
                            <Link to="/view-requests" style={{ textDecoration: "none", color: 'gray' }}>
                                <MenuItem>View Requests</MenuItem>
                            </Link>
                            <Link to="/create-employee" style={{ textDecoration: "none", color: 'gray' }}>
                                <MenuItem>Add Request</MenuItem>
                            </Link>
                        </SubMenu>
                    )}
                    {Auth.loggedIn() && Auth.getProfile().authenticatedPerson.isAdmin && (
                        <SubMenu label="Users" icon={<i className="fas fa-user"></i>}>
                            <MenuItem>View Employees</MenuItem>
                            <Link to="/create-employee" style={{ textDecoration: "none", color: 'gray' }}>
                                <MenuItem>Create Employee</MenuItem>
                            </Link>
                        </SubMenu>
                    )}
                    <MenuItem icon={<i className="fas fa-project-diagram"></i>}>
                        {Auth.loggedIn() && !Auth.getProfile().authenticatedPerson.isAdmin ? 'View Status' : 'Requests'}
                    </MenuItem>
                </Menu>
                <div className="logout-button">
                    <Menu iconShape="square">
                        <MenuItem icon={<i className="fas fa-sign-out-alt"></i>} onClick={logout}>Logout</MenuItem>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
