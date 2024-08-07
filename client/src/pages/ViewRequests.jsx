import React, { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { Link } from "react-router-dom";
import { QUERY_ME, QUERY_USER_TIME_OFF_REQUESTS } from '../utils/queries';

const ViewRequests = () => {
  // Query to get the current user's information
  const { loading: userLoading, data: userData } = useQuery(QUERY_ME);
  const user = userData?.me || {};

  // Query to get the current user's time off requests
  const { loading: requestsLoading, data: requestsData, refetch } = useQuery(QUERY_USER_TIME_OFF_REQUESTS, {
    variables: { userId: user._id },
    skip: !user._id, // Skip query until userId is available
  });

  const [requests, setRequests] = useState([]);

  useEffect(() => {
    if (requestsData) {
      setRequests(requestsData.userTimeOffRequests);
    }
  }, [requestsData]);

  if (userLoading || requestsLoading) return <p>Loading...</p>;
  if (!user._id) return <p>Error loading user information</p>;

  return (
    <div className="container">
      <div className="pie-chart-card bg-light p-3">
        <div className="d-flex justify-content-between align-items-center">
          <h3>{user.username}'s Time Off Requests</h3>
          <Link to="/request-time-off" className="create-employee-btn">
            <i className="fas fa-plus"></i>
          </Link>
        </div>
        <hr />
        <table className="table">
          <thead>
            <tr>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={request._id}>
                <td>{request.startDate}</td>
                <td>{request.endDate}</td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewRequests;
