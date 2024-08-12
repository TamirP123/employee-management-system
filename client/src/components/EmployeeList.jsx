import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_USERS } from "../utils/queries";
import { Avatar } from "@mui/material";
import '../styles/employeelist.css';

const EmployeeList = () => {
    const { loading, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];
    const nonAdminUsers = users.filter(user => !user.isAdmin);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="employee-card bg-light mt-4 position-relative">
            <div className="d-flex justify-content-between align-items-center mx-3 mt-3">
                <h4 className="lead">Employee List</h4>
                <Link to="/create-employee" className="create-employee-btn">
                    <i className="fa-solid fa-user-plus"></i>
                </Link>
            </div>
            <div className="col-12">
                <table className="table table-striped mt-3">
                    <thead>
                        <tr>
                            <th className="lead">Name</th>
                            <th className="lead">Email</th>
                            <th className="lead">Role</th>
                            <th className="lead">Join Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nonAdminUsers.map((user) => (
                            <tr key={user.id}>
                                <td className="d-flex align-items-center">
                                    <Avatar
                                        alt={user.username}
                                        src={user.profilePicture}
                                        sx={{ width: 40, height: 40, marginRight: 2 }}
                                    />
                                    {user.username}
                                </td>
                                <td>{user.email}</td>
                                <td>Employee</td>
                                <td>{user.createdAt}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeList;
