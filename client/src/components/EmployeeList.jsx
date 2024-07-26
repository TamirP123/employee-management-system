import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_USERS } from "../utils/queries";
import '../styles/employeelist.css';


const EmployeeList = () => {
    const { loading, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];
    const nonAdminUsers = users.filter(user => !user.isAdmin);

    console.log(nonAdminUsers);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
      <div className="employee-card bg-light mt-4">
      <h4 className="mt-3 mx-3 text-start lead">Employee List</h4>
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
                <td>{user.username}</td>
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
