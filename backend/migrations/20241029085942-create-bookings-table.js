const { Booking } = require('../../models');

const StoreBooking = async (req, res) => {
    const { id, firstName, lastName, dateRange } = req.body;
    
    // Parse the dates to ensure they are Date objects
    const vehicleId = id;
    const startDate = new Date(dateRange.startDate);
    const endDate = new Date(dateRange.endDate);

    console.log(vehicleId, firstName, lastName, dateRange);

    try {
        // Create the booking entry in the database
        const booking = await Booking.create({
            vehicleId,
            firstName,
            lastName,
            startDate,
            endDate,
        });

        // Log the created booking details correctly
        console.log(booking.toJSON());

        // Respond with the created booking
        return res.status(201).json(booking);
    } catch (error) {
        console.error('Error storing booking:', error.message);
        return res.status(500).json({ message: 'Failed to store vehicle booking, please retry.' });
    }
};

module.exports = { StoreBooking };
