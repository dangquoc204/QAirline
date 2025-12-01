const express = require('express');
const route = express.Router();
const airplaneController = require("../controllers/airplane.controller");

route.get("/", airplaneController.getAllAirplanes);

route.get("/models", airplaneController.getAllAirplaneModels);

module.exports = route;