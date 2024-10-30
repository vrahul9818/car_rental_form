import React, { useEffect, useState } from 'react';
import { Typography, Button } from '@mui/material';
import axios from 'axios';
import '../components/css/NameStep.css';

const BookingHistoryStep = ({ prevStep, formData,restart }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5050/api/getAllBooking');
        console.log(response);
        setHistory(response.data);
      } catch (err) {
        setError('Failed to fetch booking history');
        console.error('Error fetching booking history:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  if (loading) {
    return <Typography>Loading booking history...</Typography>;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <div className="book-step-container">
      <Typography variant="h4" gutterBottom>
        All Booking History
      </Typography>
      {history.length > 0 ? (
        <ul>
          {history.map((booking, index) => (
            <li key={index}>
              {booking.firstName} {booking.lastName} - {booking.model} from {booking.startDate} to {booking.endDate} for     MODEL: {booking.vehicle['model']} TYPE: {booking.vehicle['type']}
            </li>
          ))}
        </ul>
      ) : (
        <Typography>No booking history available.</Typography>
      )}
      <div className="button-container">
        <Button variant="contained" color="primary" onClick={restart}>
          Click to register again
        </Button>
      </div>
    </div>
  );
};

export default BookingHistoryStep;
