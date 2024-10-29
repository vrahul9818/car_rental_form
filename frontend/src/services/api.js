import axios from "axios";

export const submitBookingData = async (data) => {
  try {
    const response = await axios.post('http://localhost:5050/api/storeBooking', data);
    
    return response.data; 
  } catch (error) {
    console.error("Error submitting booking data:", error);
    throw error; 
  }
};
