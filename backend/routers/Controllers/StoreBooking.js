const { Booking } = require('../../models');
const { Vehicle } = require('../../models');


const StoreBooking = async(req,res)=>{

    const { id, firstName, lastName, dateRange } = req.body;
    let vehicleId = id;
    let startDate = dateRange.startDate;
    let endDate = dateRange.endDate;

    try{
        const booking = await Booking.create({
            vehicleId,
            firstName,
            lastName,
            startDate,
            endDate,
          });
          console.log(booking)
          return res.status(201).json(booking);


    }catch(error){
        console.error('Error storing  Booking:', error.message);
        res.status(500).json({ message: 'Failed to store vehicles booking retry' });
    }

}

const getAllBooking = async (req, res) => {
    try {
        const confirmBooking = await Booking.findAll({
            include: [
                {
                    model: Vehicle,
                    as: 'vehicle',
                    attributes: ['type', 'model']
                }
            ]
        });

        const bookingList = confirmBooking.map(book => {
            const booking = book.dataValues;
            booking.startDate = booking.startDate.toISOString().split('T')[0];
            booking.endDate = booking.endDate.toISOString().split('T')[0];
            booking.vehicle = book.vehicle.dataValues;
            return booking;
        });

        console.log(bookingList);
        return res.status(200).json(bookingList);
    } catch (error) {
        console.error('Error fetching bookings:', error.message);
        return res.status(500).json({ message: 'Failed to fetch bookings' });
    }
};


module.exports = { StoreBooking, getAllBooking };
