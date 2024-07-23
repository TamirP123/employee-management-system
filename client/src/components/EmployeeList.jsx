import { Link } from "react-router-dom";
import { useEffect } from 'react';
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_USERS } from "../utils/queries";

const EmployeeList = () => {
    const { loading, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];
    const nonAdminUsers = users.filter(user => !user.isAdmin);

    console.log(nonAdminUsers);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h3>Employee List</h3>
            
                <div className="col-10">
                    <div className="row">
                        {nonAdminUsers.map((user) => (
                            <div class="user-card col-12 mx-3 mt-3">
                            <div class="user__container">
                              <div class="user">
                                <div class="user__content">
                                  <div class="text-center">
                                    <span class="name text-dark">{user.username}</span>
                                    <p class="username">{user.email}</p>
                                    <h3 class="username">Status: []</h3>
                                  </div>
                                </div>
                                
                              </div>  
                          
                            </div>
                            <a class="more" href="#">View</a>
                          </div>
                        ))}
                    </div>
                </div>
        </div>
    );
};

export default EmployeeList;
