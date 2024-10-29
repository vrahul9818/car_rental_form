const { sequelize } = require('../../models');

const getVehicles = async (req, res) => {
  console.log("in get vehicles");
  try {
    const { wheels, startDate, endDate } = req.query;
    console.log(wheels, startDate, endDate);

    const start = new Date(startDate).toISOString().split('T')[0];
    const end = new Date(endDate).toISOString().split('T')[0];
    // console.log(start, end, "changed dates");

    const vehiclesQuery = 'SELECT * FROM Vehicles';
    const [vehicles] = await sequelize.query(vehiclesQuery);
    // console.log(vehicles, "vehicle");

    const bookingsQuery = `
      SELECT * FROM Bookings
      WHERE (startDate <= :endDate AND endDate >= :startDate)
    `;
    const [bookings] = await sequelize.query(bookingsQuery, {
      replacements: { startDate: start, endDate: end }
    });

    // console.log(bookings, "booked vehicle details");

    const bookedVehicleIds = bookings.map(booking => booking.vehicleId);
    console.log(bookedVehicleIds, "booking vehicle id");

    // Filter out vehicles that are booked
    let availableVehicles = vehicles.filter(vehicle => !bookedVehicleIds.includes(vehicle.id));
    // console.log(availableVehicles, "available");

    if (wheels) {
      const wheelsNumber = parseInt(wheels, 10);
      availableVehicles = availableVehicles.filter(vehicle => vehicle.wheels === wheelsNumber);
    }

    res.status(200).json(availableVehicles);
  } catch (error) {
    console.error('Error fetching vehicles:', error.message);
    res.status(500).json({ message: 'Failed to fetch vehicles' });
  }
};

module.exports = { getVehicles };
