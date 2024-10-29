import React, { useState, useEffect } from 'react';
import { Box, Button, Typography } from '@mui/material';
import axios from 'axios'; // Import axios for API calls
import '../components/css/NameStep.css'; 

const DateRangeStep = ({ nextStep, prevStep, handleDataChange, formData }) => {
  const [error, setError] = useState('');
  const [duration, setDuration] = useState('');
  const [bookings, setBookings] = useState([]); 
  const today = new Date().toISOString().split('T')[0];

  // const fetchVehicleBookings = async (id) => {
  //   try {
  //     console.log(id);
  //     const response = await axios.get(`http:localhost:5050/api/GetVehicleId?id=${id}`);  
  //     if (response.data) {
  //       setBookings(response.data[0]?.bookings || []); 
  //     }
  //   } catch (error) {
  //     console.error('Error fetching vehicle bookings:', error.message);
  //   }
  // };

  // useEffect(() => {
  //   if (formData.id) {
  //     fetchVehicleBookings(formData.id); // Fetch bookings based on vehicle ID
  //   }
  // }, [formData.id]);

  const handleNext = () => {
    const { startDate, endDate } = formData.dateRange;

    if (startDate && endDate) {
      if (new Date(endDate) < new Date(startDate)) {
        setError('End date must be greater than or equal to the start date.');
        setDuration(''); 
      } else {
        setError(''); 
        handleDataChange('dateRange', { startDate, endDate });
        nextStep();
      }
    } else {
      setError('Please select both start and end dates.');
      setDuration(''); 
    }
  };

  useEffect(() => {
    const { startDate, endDate } = formData.dateRange;
    if (startDate && endDate) {
      if (new Date(endDate) < new Date(startDate)) {
        setError('End date must be greater than or equal to the start date.');
        setDuration(''); 
      } else {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDuration(diffDays || 1); 
        setError(''); 
      }
    } else {
      setDuration(''); 
      setError(''); 
    }
  }, [formData.dateRange.startDate, formData.dateRange.endDate]);

  const isDateDisabled = (date) => {
    const parsedDate = new Date(date);
    return bookings.some(booking => {
      const bookingStart = new Date(booking.startDate);
      const bookingEnd = new Date(booking.endDate);
      return parsedDate >= bookingStart && parsedDate <= bookingEnd;
    });
  };

  return (
    <div className="name-step-container">
      <Box>
        <Typography variant="h4" gutterBottom>
          Select Date Range
        </Typography>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">Start Date:</Typography>
          <input 
            type="date" 
            min={today} 
            value={formData.dateRange.startDate} 
            onChange={(e) => handleDataChange('dateRange', { ...formData.dateRange, startDate: e.target.value })} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '8px' }}
            disabled={isDateDisabled(formData.dateRange.startDate)} 
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1">End Date:</Typography>
          <input 
            type="date" 
            min={formData.dateRange.startDate || today} 
            value={formData.dateRange.endDate} 
            onChange={(e) => handleDataChange('dateRange', { ...formData.dateRange, endDate: e.target.value })} 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginTop: '8px' }}
            disabled={isDateDisabled(formData.dateRange.endDate)} 
          />
        </Box>
        {error && <Typography sx={{ color: 'red', mb: 2 }}>{error}</Typography>}
        
        {duration && (
          <Typography sx={{ mb: 2 }}>
            Duration: {duration} {duration === 1 ? 'day' : 'days'}
          </Typography>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
          <Button variant="contained" color="secondary" onClick={prevStep}>
            Back
          </Button>
          <Button variant="contained" color="primary" onClick={handleNext}>
            NEXT
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default DateRangeStep;
