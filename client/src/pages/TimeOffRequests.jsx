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
  Modal,
  Box,
} from "@mui/material";
import ClockNotification from "../components/ClockNotification";
import '../styles/timeoffrequests.css'; 

const TimeOffRequests = () => {
  const { loading, data } = useQuery(QUERY_TIME_OFF_REQUESTS);
  const [updateRequestStatus] = useMutation(UPDATE_TIME_OFF_REQUEST_STATUS);

  const [notification, setNotification] = useState({
    message: null,
    type: null,
  });

  const [openModal, setOpenModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedRequest(null);
  };

  const handleUpdate = async (requestId, status) => {
    try {
      await updateRequestStatus({
        variables: { requestId, status },
      });
      setNotification({
        message: `Request ${status}`,
        type: status === "Rejected" ? "error" : "success",
      });
      handleCloseModal();
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
        <div className="col-9">
          <Card sx={{mt:3}}>
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
                      <TableCell align="center">Notes</TableCell> 
                      <TableCell align="center">Status</TableCell>
                      <TableCell align="center">Action</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.timeOffRequests.map((request) => {
                      const formattedStartDate = dayjs(request.startDate).format("M/D/YYYY");
                      const formattedEndDate = dayjs(request.endDate).format("M/D/YYYY");

                      return (
                        <TableRow 
                          key={request._id} 
                          onClick={() => handleOpenModal(request)} 
                          style={{ cursor: 'pointer' }}
                        >
                          <TableCell align="center">{request.userId.username}</TableCell>
                          <TableCell align="center">{formattedStartDate}</TableCell>
                          <TableCell align="center">{formattedEndDate}</TableCell>
                          <TableCell 
                            align="center" 
                            sx={{
                              maxWidth: 150,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap"
                            }}
                            title={request.notes}
                          >
                            {request.notes}
                          </TableCell>
                          <TableCell align="center">{request.status}</TableCell>
                          <TableCell align="center">
                            <Button variant="outlined" color="success" onClick={(e) => {
                              e.stopPropagation(); // Prevents the row click from triggering the modal
                              handleUpdate(request._id, "Approved");
                            }} style={{ marginRight: 8 }}>
                              Approve
                            </Button>
                            <Button variant="outlined" color="error" onClick={(e) => {
                              e.stopPropagation();
                              handleUpdate(request._id, "Rejected");
                            }}>
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

      {/* Modal for displaying request details */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="request-modal-title"
        aria-describedby="request-modal-description"
      >
        <Box 
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedRequest && (
            <>
              <Typography id="request-modal-title" variant="h6" component="h2">
                Request Details
              </Typography>
              <Typography id="request-modal-description" sx={{ mt: 2 }}>
                <strong>Name:</strong> {selectedRequest.userId.username}
              </Typography>
              <Typography id="request-modal-description" sx={{ mt: 2 }}>
                <strong>Start Date:</strong> {dayjs(selectedRequest.startDate).format("M/D/YYYY")}
              </Typography>
              <Typography id="request-modal-description" sx={{ mt: 2 }}>
                <strong>End Date:</strong> {dayjs(selectedRequest.endDate).format("M/D/YYYY")}
              </Typography>
              <Typography id="request-modal-description" sx={{ mt: 2 }}>
                <strong>Notes:</strong> {selectedRequest.notes}
              </Typography>
              <Typography id="request-modal-description" sx={{ mt: 2 }}>
                <strong>Status:</strong> {selectedRequest.status}
              </Typography>
              <Button 
                variant="outlined" 
                color="success" 
                onClick={() => handleUpdate(selectedRequest._id, "Approved")}
                sx={{ mt: 2, mr: 2 }}
              >
                Approve
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={() => handleUpdate(selectedRequest._id, "Rejected")}
                sx={{ mt: 2 }}
              >
                Reject
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default TimeOffRequests;
