import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_LOGS } from '../utils/queries';
import SidePanel from '../components/SidePanel';

const LogsPage = () => {
  const { loading, data } = useQuery(QUERY_LOGS);
  let logs = data?.logs || [];

  // Create a new array and sort by timestamp in ascending order
  logs = [...logs].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-2">
          <SidePanel />
        </div>
        <div className="col-9">
          <h1>Logs</h1>
          <table className="table">
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>
              {logs.map(log => (
                <tr key={log._id}>
                  <td>{log.userId.username}</td>
                  <td>{log.action === "CLOCK_IN" ? "Clock In" : "Clock Out"}</td>
                  <td>{new Date(log.timestamp).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogsPage;
