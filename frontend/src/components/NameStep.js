import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import '../components/css/NameStep.css';

const NameStep = ({ nextStep, handleDataChange, formData }) => {
  const [errors, setErrors] = useState({ firstName: '', lastName: '' });

  const validateName = (name) => {
    if (!name) {
      return 'This field is required';
    } else if (!/^[a-zA-Z\s-]+$/.test(name)) {
      return 'Only letters, spaces, and hyphens are allowed';
    } else if (name.length < 2) {
      return 'Name must be at least 2 characters long';
    }
    return '';
  };

  const handleNext = () => {
    const firstNameError = validateName(formData.firstName);
    const lastNameError = validateName(formData.lastName);

    if (firstNameError || lastNameError) {
      setErrors({ firstName: firstNameError, lastName: lastNameError });
    } else {
      nextStep();
    }
  };

  return (
    <div className="name-step-container">
      <Typography variant="h4" gutterBottom>
        What is your name?
      </Typography>
      <div className="name-step-input">
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          value={formData.firstName}
          onChange={(e) => {
            handleDataChange('firstName', e.target.value);
            setErrors({ ...errors, firstName: '' });
          }}
          error={!!errors.firstName}
          helperText={errors.firstName}
          required
        />
      </div>
      <div className="name-step-input">
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          value={formData.lastName}
          onChange={(e) => {
            handleDataChange('lastName', e.target.value);
            setErrors({ ...errors, lastName: '' });
          }}
          error={!!errors.lastName}
          helperText={errors.lastName}
          required
        />
      </div>
      <Button variant="contained" color="primary" onClick={handleNext}>
        Next
      </Button>
    </div>
  );
};

export default NameStep;
