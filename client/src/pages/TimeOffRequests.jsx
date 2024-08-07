import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import dayjs from "dayjs";
import { QUERY_TIME_OFF_REQUESTS } from "../utils/queries";
import { UPDATE_TIME_OFF_REQUEST_STATUS } from "../utils/mutations";
import SidePanel from "../components/SidePanel";
import { Table, Button } from "react-bootstrap";
import ClockNotification from "../components/ClockNotification";

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
        <div className="col-8">
        <div className="pie-chart-card bg-light p-3">
          <h2 className="mt-4 text-start text-secondary">Time Off Requests</h2>
          <hr />
          <Table className="table align-middle mb-0 bg-white mt-4">
            <thead>
              <tr>
                <th className="text-center">Name</th>
                <th className="text-center">Start Date</th>
                <th className="text-center">End Date</th>
                <th className="text-center">Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.timeOffRequests.map((request) => {
                const formattedStartDate = dayjs(request.startDate).format(
                  "M/D/YYYY"
                );
                const formattedEndDate = dayjs(request.endDate).format(
                  "M/D/YYYY"
                );
                const statusClass =
                  request.status === "Approved"
                    ? "badge-success"
                    : "badge-warning";

                return (
                  <tr key={request._id}>
                    <td className="text-center">
                      <div className="d-flex align-items-center justify-content-center">
                        <div className="ms-3">
                          <p className="fw-bold mb-1">
                            {request.userId.username}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center">{formattedStartDate}</td>
                    <td className="text-center">{formattedEndDate}</td>
                    <td className="text-center">{request.status}</td>
                    <td className="text-center">
                      <Button
                        variant="outline-success"
                        onClick={() => handleUpdate(request._id, "Approved")}
                        className="me-2"
                      >
                        Approve
                      </Button>
                      <Button
                        variant="outline-danger"
                        onClick={() => handleUpdate(request._id, "Rejected")}
                      >
                        Reject
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          {notification.message && (
            <ClockNotification
              message={notification.message}
              onClose={handleCloseNotification}
              type={notification.type}
            />
          )}
        </div>
        </div>
      </div>
    </div>
  );
};

export default TimeOffRequests;
