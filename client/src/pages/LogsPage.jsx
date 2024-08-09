import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_LOGS } from '../utils/queries';
import SidePanel from '../components/SidePanel';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Card,
  CardContent,
  CardHeader
} from '@mui/material';

const LogsPage = () => {
  const [filter, setFilter] = useState('all');
  const { loading, data } = useQuery(QUERY_LOGS);
  let logs = data?.logs || [];

  // Create a new array and sort by timestamp in ascending order
  logs = [...logs].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  // Filter logs based on selected filter
  const filterLogs = (logs) => {
    const now = new Date();
    switch (filter) {
      case 'week':
        const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
        return logs.filter(log => new Date(log.timestamp) >= startOfWeek);
      case 'day':
        const startOfDay = new Date(now.setHours(0, 0, 0, 0));
        return logs.filter(log => new Date(log.timestamp) >= startOfDay);
      default:
        return logs;
    }
  };

  const filteredLogs = filterLogs(logs);

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
          <Card>
            <CardHeader title="Logs" className='text-start' />
            <CardContent>
              {/* Filter Dropdown */}
              <FormControl fullWidth margin="normal">
                <InputLabel>Filter By</InputLabel>
                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  label="Filter By"
                >
                  <MenuItem value="all">All Time</MenuItem>
                  <MenuItem value="week">Previous Week</MenuItem>
                  <MenuItem value="day">Today</MenuItem>
                </Select>
              </FormControl>

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>User</TableCell>
                      <TableCell>Action</TableCell>
                      <TableCell>Timestamp</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredLogs.map(log => (
                      <TableRow key={log._id}>
                        <TableCell>{log.userId.username}</TableCell>
                        <TableCell>{log.action === "CLOCK_IN" ? "Clock In" : "Clock Out"}</TableCell>
                        <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LogsPage;
