// components/WheelsStep.js

import React, { useState } from 'react';
import { Box, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import '../components/css/VehicleTypeStep.css'; 

const WheelsStep = ({ nextStep, prevStep, handleDataChange, formData }) => {
  const [error, setError] = useState('');

  const handleNext = () => {
    if (formData.wheels) {
      nextStep();
    } else {
      setError('Please select the number of wheels.');
    }
  };

  return (
    <div className="name-step-container"><Box>
    <Typography variant="h4" >
      Number of Wheels?
    </Typography>
    <FormControl component="fieldset">
      <FormLabel component="legend">Select Number of Wheels</FormLabel>
      <RadioGroup 
        aria-label="wheels" 
        name="wheels" 
        value={formData.wheels} 
        onChange={(e) => handleDataChange('wheels', e.target.value)}
      >
        <FormControlLabel value="2" control={<Radio />} label="2 Wheels" />
        <FormControlLabel value="4" control={<Radio />} label="4 Wheels" />
      </RadioGroup>
    </FormControl>
    {error && <Typography sx={{ color: 'red', mt: 2 }}>{error}</Typography>}
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mt: 3 }}>
      <Button variant="contained" color="secondary" onClick={prevStep}>
        Back
      </Button>
      <Button variant="contained" color="primary" onClick={handleNext}>
        Next
      </Button>
    </Box>
  </Box></div>
    
  );
};

export default WheelsStep;
