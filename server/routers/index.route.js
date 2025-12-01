const express = require('express');
const adminRoute = require('../routers/admin.route');
const airplaneRoute = require('../routers/airplane.route');
const authRoute = require('../routers/auth.route');
const flightRoute = require('../routers/flight.route');
const postRoute = require('../routers/post.route');
const customerRoute = require('../routers/customer.route');

module.exports.index = (app) => { 
    app.use("/api/auth", authRoute);
    app.use("/api/customer", customerRoute);
    app.use("/api/airplanes", airplaneRoute);
    app.use("/api/post", postRoute);
    app.use("/api/admin", adminRoute);
    app.use("/api/flights", flightRoute);
}

