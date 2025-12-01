const express = require('express');
const route = express.Router();
const adminController = require("../controllers/admin.controller");
const { verifyToken } = require("../middlewares/auth.middleware");
const { verifyAdmin } = require("../middlewares/admin.middleware");


//Them chuyen bay: /api/admin/flight
route.post("/flight",verifyToken, verifyAdmin,adminController.addFlight);

// Edit a flight: /api/admin/flight/:id
route.patch('/flight/:id',verifyToken, verifyAdmin,adminController.editFlight);

// Delete a flight /api/admin/flight/:id
route.delete('/flight/:id',verifyToken, verifyAdmin,adminController.deleteFlight);


//Cap nhat trang thai chuyen bay
route.patch("/flight/:flightId/status",verifyToken, verifyAdmin, adminController.updateFlightStatus);

//Cap nhat so luong ghe ngoi
route.patch("/airplane/seatCount",verifyToken, verifyAdmin, adminController.updateSeatCount);


//Dang thong tin 
route.post("/post", verifyToken, verifyAdmin, adminController.createPost);

//[DELETE] /api/admin/post/:id: Xóa bài viết theo id
route.delete("/post/:id",verifyToken, verifyAdmin, adminController.deletePost);

//[PATCH] /api/admin/post/:id: Cập nhật bài viết theo id
route.patch("/post/:id",verifyToken, verifyAdmin, adminController.editPost);


//[POST] /api/admin/airplane Route to add a new airplane
route.post("/airplane",verifyToken, verifyAdmin, adminController.addAirplane);

//[PATCH] /api/admin/airplane/:id Route to update an existing airplane
route.patch("/airplane/:id",verifyToken, verifyAdmin, adminController.updateAirplane);

// [DELETE] /api/admin/airplane/:id Route to delete an airplane
route.delete("/airplane/:id",verifyToken, verifyAdmin, adminController.deleteAirplane);

//Xem booking
route.get("/bookings",verifyToken, verifyAdmin, adminController.viewBookings);

module.exports = route;