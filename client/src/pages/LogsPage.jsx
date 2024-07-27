import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_LOGS } from '../utils/queries';

const LogsPage = () => {
  const { loading, data } = useQuery(QUERY_LOGS);
  const logs = data?.logs || [];
  console.log(logs);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
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
              <td>{log.action}</td>
              <td>{new Date(log.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LogsPage;