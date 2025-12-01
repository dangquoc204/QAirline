const express = require('express');
const route = express.Router();
const controller = require("../controllers/flight.controller");

// Get all flights
route.get('/', controller.getAllFlights);


module.exports = route;