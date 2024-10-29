const express = require('express');
const router = express.Router();

const { getVehicles } = require('./Controllers/GetVehicleId');
const {StoreBooking,getAllBooking} = require('./Controllers/StoreBooking');


router.get('/getvehicles', getVehicles);
router.post('/storeBooking',StoreBooking);
router.get('/getAllBooking',getAllBooking);

module.exports = router;
