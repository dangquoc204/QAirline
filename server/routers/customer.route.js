const express = require('express');
const route = express.Router();
const customerController = require("../controllers/customer.controller");
const { verifyToken } = require("../middlewares/auth.middleware");

//[GET]: /api/customer/search-flights: Tim kiem cac chuyen bay

route.get("/search-flights", customerController.searchFlights);

//[POST] /api/customer/book: Tao moi mot booking
route.post("/bookForLogin", verifyToken, customerController.createBooking);

route.post("/bookForNotLogin",customerController.createBookingNotLogin)

//[DELETE]: /api/customer/cancel/:bookingId: Huy mot booking
route.patch("/cancel/:id",verifyToken, customerController.cancelBooking);

//[GET] /api/customer/booking/:bookingId: Theo doi thong tin booking
route.get("/booking/:bookingId",verifyToken, customerController.trackBooking);

//[GET] /api/customer/booking-details: Lấy chi tiết thông tin booking
route.get("/booking-detail",customerController.getBookingsDetail);

//[GET] /api/customer/my-info : Xem thong tin ca nhan
route.get('/my-info',verifyToken, customerController.getProfile);

// Cập nhật thông tin khách hàng
route.patch("/update-profile", verifyToken, customerController.updateProfile);

// Lấy tất cả thông tin đặt vé của người dùng
route.get("/my-bookings", verifyToken, customerController.getUserBookings);

//[DELETE]: /api/customer/cancel/:bookingId: Huy mot booking
route.patch("/cancelNotLogin/:id", customerController.cancelBookingNotLogin);

// Đổi mật khẩu tài khoản
route.patch("/change-password", verifyToken, customerController.changePassword);



module.exports = route;