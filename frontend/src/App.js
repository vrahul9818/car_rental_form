import React, { useState } from 'react';
import '../src/App.css'; 
import NameStep from './components/NameStep';
import WheelsStep from './components/WheelsStep';
import VehicleTypeStep from './components/VehicleTypeStep';
import DateRangeStep from './components/DateRangeStep';
import BookingHistoryStep from './components/BookingHistoryStep'; 
import { submitBookingData } from './services/api';

const App = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    wheels: '',
    id: '',
    dateRange: { startDate: '', endDate: '' }
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleDataChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
    console.log(formData);
  };

  const restart = () => {
    setStep(1);
    setFormData({
      firstName: '',
      lastName: '',
      wheels: '',
      id: '',
      dateRange: { startDate: '', endDate: '' }
    });
  };
  const handleSubmit = async () => {
    const confirmationMessage = `Booking For: ${formData.dateRange.startDate} to ${formData.dateRange.endDate}. Do you want to confirm?`;
    
    const userConfirmed = window.confirm(confirmationMessage);
    
    if (userConfirmed) {
      try {
        const returnData = await submitBookingData(formData); 
        if (returnData) {
          alert("Your booking is submitted successfully!");
          nextStep(); 
        }
      } catch (error) {
        alert("There was an error submitting your booking. Please try again."); 
        console.error("Error submitting booking:", error); 
      }
    } else {
      console.log("Booking not confirmed. Submission canceled.");
      handleDataChange('id','')
    }
  };
  
  

  return (
    <div className="app-container"> 
      {step === 1 && (
        <NameStep nextStep={nextStep} handleDataChange={handleDataChange} formData={formData} />
      )}
      {step === 2 && (
        <WheelsStep nextStep={nextStep} prevStep={prevStep} handleDataChange={handleDataChange} formData={formData} />
      )}
      {step === 3 && (
                <DateRangeStep nextStep={nextStep} prevStep={prevStep} handleDataChange={handleDataChange} formData={formData} />

      )}
      {step === 4 && (
                <VehicleTypeStep nextStep={nextStep}  handleSubmit={handleSubmit} prevStep={prevStep} handleDataChange={handleDataChange} formData={formData} />
      )}
      {step === 5 && ( 
        <BookingHistoryStep handleSubmit={handleSubmit} prevStep={prevStep} handleDataChange={handleDataChange} formData={formData} restart ={restart} />
      )}
    </div>
  );
};

export default App;
