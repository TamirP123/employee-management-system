import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import { Card, CardContent, CardHeader, TextField, Button, Grid } from '@mui/material';
import { QUERY_ME } from '../utils/queries';
import { REQUEST_TIME_OFF } from '../utils/mutations';
import ClockNotification from '../components/ClockNotification';
import SidePanel from '../components/SidePanel';

const RequestTimeOff = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [notes, setNotes] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  const { data } = useQuery(QUERY_ME);
  const currentUserId = data?.me?._id;

  const [requestTimeOff] = useMutation(REQUEST_TIME_OFF, {
    refetchQueries: [{ query: QUERY_ME }],
    onCompleted: () => {
      setNotification({ message: 'Time off request submitted successfully!', type: 'success' });
    },
    onError: (err) => {
      setNotification({ message: `Error: ${err.message}`, type: 'error' });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentUserId) {
        const formattedStartDate = dayjs(startDate).format('M/D/YYYY');
        const formattedEndDate = dayjs(endDate).format('M/D/YYYY');

        await requestTimeOff({
          variables: { startDate: formattedStartDate, endDate: formattedEndDate, notes, userId: currentUserId },
        });
      } else {
        setNotification({ message: 'User is not logged in.', type: 'error' });
      }
    } catch (err) {
      console.error(err);
      setNotification({ message: 'An error occurred while submitting the request.', type: 'error' });
    }
  };

  const handleNotificationClose = () => {
    setNotification({ message: '', type: '' });
  };

  return (
    <Grid container>
      <Grid item xs={12} md={2}>
        <SidePanel />
      </Grid>
      <Grid item xs={12} md={9}>
        <Card sx={{ maxWidth: 600, margin: 'auto', marginTop: 4 }}>
          <CardHeader title="Request Time Off" />
          <CardContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Start Date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                fullWidth
                required
                sx={{ marginBottom: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="End Date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                fullWidth
                required
                sx={{ marginBottom: 2 }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                label="Notes"
                multiline
                rows={4}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter any additional notes"
                fullWidth
                sx={{ marginBottom: 2 }}
              />
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </Grid>
      <ClockNotification 
        message={notification.message} 
        type={notification.type} 
        onClose={handleNotificationClose} 
      />
    </Grid>
  );
};

export default RequestTimeOff;
