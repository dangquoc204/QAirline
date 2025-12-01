const { Flight, Airplane } = require('../models/index.model');
const flightService = require('../service/flight.service');


//[GET] /api/flight
exports.getAllFlights = async (req, res) => {
    try {
        const flights = await flightService.getAllFlights();
        return res.status(200).json(flights);
    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi lấy chuyến bay" });
    }
}

