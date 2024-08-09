import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import dayjs from "dayjs";
import { QUERY_TIME_OFF_REQUESTS } from "../utils/queries";
import { UPDATE_TIME_OFF_REQUEST_STATUS } from "../utils/mutations";
import SidePanel from "../components/SidePanel";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import ClockNotification from "../components/ClockNotification";
import '../styles/timeoffrequests.css';  // Import your CSS file here

const TimeOffRequests = () => {
  const { loading, data } = useQuery(QUERY_TIME_OFF_REQUESTS);
  const [updateRequestStatus] = useMutation(UPDATE_TIME_OFF_REQUEST_STATUS);

  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const handleUpdate = async (requestId, status) => {
    try {
      await updateRequestStatus({
        variables: { requestId, status },
      });
      setNotification({
        message: `Request ${status}`,
        type: status === "Rejected" ? "error" : "success",
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleCloseNotification = () => {
    setNotification({ message: null, type: null });
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container-fluid">
      <div className="row flex-nowrap">
        <div className="col-2">
          <SidePanel />
        </div>
        <div className="col-10">
          <Card>
            <CardContent>
              <Typography variant="h5" component="div" gutterBottom>
                Time Requests
              </Typography>
              <TableContainer component={Paper} className="table-container">
                <Table className="table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Name</TableCell>
                      <TableCell align="center">Start Date</TableCell>
                      <TableCell align="center">End Date</TableCell>
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.timeOffRequests.map((request) => {
                      const formattedStartDate = dayjs(request.startDate).format(
                        "M/D/YYYY"
                      );
                      const formattedEndDate = dayjs(request.endDate).format(
                        "M/D/YYYY"
                      );

                      return (
                        <TableRow key={request._id}>
                          <TableCell align="center">
                            {request.userId.username}
                          </TableCell>
                          <TableCell align="center">
                            {formattedStartDate}
                          </TableCell>
                          <TableCell align="center">
                            {formattedEndDate}
                          </TableCell>
                          <TableCell align="center">
                            {request.status}
                          </TableCell>
                          <TableCell align="center">
                            <Button
                              variant="outlined"
                              color="success"
                              onClick={() =>
                                handleUpdate(request._id, "Approved")
                              }
                              style={{ marginRight: 8 }}
                            >
                              Approve
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() =>
                                handleUpdate(request._id, "Rejected")
                              }
                            >
                              Reject
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
              {notification.message && (
                <ClockNotification
                  message={notification.message}
                  onClose={handleCloseNotification}
                  type={notification.type}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TimeOffRequests;
