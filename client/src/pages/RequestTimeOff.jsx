import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import dayjs from 'dayjs';
import { QUERY_ME } from '../utils/queries';
import { REQUEST_TIME_OFF } from '../utils/mutations';

const RequestTimeOff = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Use the QUERY_ME to get the current user's data
  const { data } = useQuery(QUERY_ME);
  const currentUserId = data?.me?._id;

  const [requestTimeOff] = useMutation(REQUEST_TIME_OFF, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentUserId) {
        // Format the dates to "M/D/YYYY"
        const formattedStartDate = dayjs(startDate).format('M/D/YYYY');
        const formattedEndDate = dayjs(endDate).format('M/D/YYYY');

        await requestTimeOff({
          variables: { startDate: formattedStartDate, endDate: formattedEndDate, userId: currentUserId },
        });
      } else {
        console.error('User is not logged in.');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Request Time Off</h2>
      <label>Start Date:</label>
      <input 
        type="date" 
        value={startDate} 
        onChange={(e) => setStartDate(e.target.value)} 
        required
      />
      <label>End Date:</label>
      <input 
        type="date" 
        value={endDate} 
        onChange={(e) => setEndDate(e.target.value)} 
        required
      />
      <button type="submit">Submit Request</button>
    </form>
  );
};

export default RequestTimeOff;
