const {Op} = require('sequelize');
const {Booking, Flight, Customer,Seat, Passenger, Airplane, User} = require('../models/index.model');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const generateRandomString = require("../helpers/generateRandomString.helper");

const jwt = require('jsonwebtoken');
const md5 = require('md5');
const { profile } = require('console');


//[GET] /api/customer/search-flights : Tìm kiếm chuyến bay

exports.searchFlights = async (req, res) => {
  try {
    const { origin, destination, departure_date, return_date, seat_type } = req.query;

    // Điều kiện tìm kiếm chuyến đi
    const whereConditions = {};
    if (origin) whereConditions.origin = origin;
    if (destination) whereConditions.destination = destination;
    if (departure_date && return_date) {
      whereConditions.departure_time = { 
        [Op.between]:  [
          new Date(departure_date),      // >= ngày khởi hành
          new Date(return_date)          // <= ngày khứ hồi
        ] 
      };
    } else if (departure_date) {
      whereConditions.departure_time = {
        [Op.gte]: new Date(departure_date)  // >= ngày khởi hành
      };
    }

    // Điều kiện tìm kiếm chuyến về (nếu có)
    let returnFlightsWhere = null;
    if (return_date) {
      returnFlightsWhere = {
        origin: destination,
        destination: origin,
        departure_time: { 
          [Op.gte]: new Date(return_date) 
        },
      };
    }

    // Điều kiện cho ghế
    const seatWhere = { is_available: true };
    if (seat_type) seatWhere.seat_type = seat_type;

    // Truy vấn chuyến đi
    const outgoingFlights = await Flight.findAll({
      where: whereConditions,
      include: [
        {
          model: Seat,
          where: seatWhere,
          required: false,
          attributes: ["id", "seat_type", "seat_number", "is_available", "price"],
        },
        {
          model: Airplane,
          attributes: ["model", "manufacturer"],
        },
      ],
    });

    // Truy vấn chuyến về (nếu có)
    let returnFlights = [];
    if (returnFlightsWhere) {
      returnFlights = await Flight.findAll({
        where: returnFlightsWhere,
        include: [
          {
            model: Seat,
            where: seatWhere,
            required: false,
            attributes: ["id", "seat_type", "seat_number", "is_available", "price"],
          },
          {
            model: Airplane,
            attributes: ["model", "manufacturer"],
          },
        ],
      });
    }

    // Nếu không có chuyến nào phù hợp
    if (outgoingFlights.length === 0 && returnFlights.length === 0) {
      return res.status(404).json({ message: "No flights found" });
    }

    // Đánh dấu loại chuyến bay
    outgoingFlights.forEach(flight => (flight.type = "outbound"));
    returnFlights.forEach(flight => (flight.type = "return"));

    // Trả về kết quả
    res.status(200).json({
      message: "Tìm kiếm chuyến bay thành công",
      flights: return_date
        ? { outgoing: outgoingFlights, return: returnFlights }
        : outgoingFlights,
    });
  } catch (error) {
    console.error("Lỗi tìm kiếm chuyến bay:", error);
    res.status(500).json({
      message: "Lỗi hệ thống khi tìm kiếm chuyến bay",
      error: error.message,
    });
  }
};

//[POST]: /api/customer/bookForLogin
exports.createBooking = async (req, res) => {
  const {
    totalPrice,
    outboundFlight,
    returnFlight,
    passengerDetails,
    paymentDetails,
    booking_code
  } = req.body;

  // Validate inputs
  if (!totalPrice || !outboundFlight || !passengerDetails || !paymentDetails || !booking_code) {
    return res.status(400).json({ message: "Thiếu trường thông tin gửi" });
  }

  try {
    // Nếu có user đăng nhập, tìm customer theo user_id
    let customerId = null;
    if (req.userId) {
      const customer = await Customer.findOne({
        where: { user_id: req.userId },
      });
      if (customer) customerId = customer.id;
    }

    // Kiểm tra chuyến bay đi
    const outboundFlightRecord = await Flight.findByPk(outboundFlight.id);
    if (!outboundFlightRecord) {
      return res.status(404).json({ message: "Không tìm được chuyến bay đi" });
    }

    // Kiểm tra chuyến bay về (nếu có)
    let returnFlightRecord = null;
    if (returnFlight) {
      returnFlightRecord = await Flight.findByPk(returnFlight.id);
      if (!returnFlightRecord) {
        return res.status(404).json({ message: "Không tìm được chuyến bay đi" });
      }
    }

    // Tạo booking, customer_id có thể null nếu khách không đăng nhập
    const booking = await Booking.create({
      customer_id: customerId, // Changed from userId to customer.id
      outbound_flight_id: outboundFlight.id,
      return_flight_id: returnFlight ? returnFlight.id : null,
      departure_time: outboundFlight.departure_time,
      return_time: returnFlight ? returnFlight.departure_time : null,
      booking_date: new Date(),
      status: "Confirmed",
      passengers: 1, // Assuming 1 passenger for simplicity
      total_price: totalPrice,
      payment_status: "Paid",
      payment_method: paymentDetails.paymentMethod,
      cardholder_name: paymentDetails.cardholderName,
      card_number: paymentDetails.cardNumber,
      expiry_date: paymentDetails.expiryDate,
      cvv: paymentDetails.cvv,
      outbound_seat_id: outboundFlight.seat_id,
      return_seat_id: returnFlight ? returnFlight.seat_id : null,
      booking_code: booking_code
    }); 

    const seat_outbound = await Seat.findOne({
      where: { id: outboundFlight.seat_id},
    });
    seat_outbound.is_available = false;
    await seat_outbound.save();

    if(returnFlight) {
      const seat_return = await Seat.findOne({
        where: {id: returnFlight.seat_id}
      })
      seat_return.is_available = false;
      await seat_return.save();
    }

    // Tạo Passenger cho booking
    await Passenger.create({
      booking_id: booking.id,
      first_name: passengerDetails.firstName,
      last_name: passengerDetails.lastName,
      email: passengerDetails.email,
      phone: passengerDetails.phone,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Lỗi đặt booking:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
};

//[POST] /api/customer/bookForNotLogin
exports.createBookingNotLogin = async (req,res) => {
  const {
    totalPrice,
    outboundFlight,
    returnFlight,
    passengerDetails,
    paymentDetails,
    booking_code
  } = req.body;

  // BUG: Removed input validation and flight checks
  // if (!totalPrice || !outboundFlight || !passengerDetails || !paymentDetails || !booking_code) {
  //   return res.status(400).json({ message: "Thiếu trường thông tin gửi" });
  // }

  try {
    // Nếu có user đăng nhập, tìm customer theo user_id
    const customerId = null;

    // BUG: Removed flight checks
    // const outboundFlightRecord = await Flight.findByPk(outboundFlight.id);
    // if (!outboundFlightRecord) {
    //   return res.status(404).json({ message: "Không tìm được chuyến bay đi" });
    // }

    // Kiểm tra chuyến bay về (nếu có)
    // let returnFlightRecord = null;
    // if (returnFlight) {
    //   returnFlightRecord = await Flight.findByPk(returnFlight.id);
    //   if (!returnFlightRecord) {
    //     return res.status(404).json({ message: "Không tìm được chuyến bay đi" });
    //   }
    // }

    // Tạo booking, customer_id có thể null nếu khách không đăng nhập
    const booking = await Booking.create({
      customer_id: customerId, //null vi khong co dang nhap
      outbound_flight_id: outboundFlight.id,
      return_flight_id: returnFlight ? returnFlight.id : null,
      departure_time: outboundFlight.departure_time,
      return_time: returnFlight ? returnFlight.departure_time : null,
      booking_date: new Date(),
      status: "Confirmed",
      passengers: 1, // Assuming 1 passenger for simplicity
      total_price: totalPrice,
      payment_status: "Paid",
      payment_method: paymentDetails.paymentMethod,
      cardholder_name: paymentDetails.cardholderName,
      card_number: paymentDetails.cardNumber,
      expiry_date: paymentDetails.expiryDate,
      cvv: paymentDetails.cvv,
      outbound_seat_id: outboundFlight.seat_id,
      return_seat_id: returnFlight ? returnFlight.seat_id : null,
      booking_code: booking_code
    }); 

    const seat_outbound = await Seat.findOne({
      where: { id: outboundFlight.seat_id},
    });
    seat_outbound.is_available = false;
    await seat_outbound.save();

    if(returnFlight) {
      const seat_return = await Seat.findOne({
        where: {id: returnFlight.seat_id}
      })
      seat_return.is_available = false;
      await seat_return.save();
    }

    // Tạo Passenger cho booking
    await Passenger.create({
      booking_id: booking.id,
      first_name: passengerDetails.firstName,
      last_name: passengerDetails.lastName,
      email: passengerDetails.email,
      phone: passengerDetails.phone,
    });

    res.status(201).json(booking);
  } catch (error) {
    console.error("Lỗi đặt booking:", error);
    res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
}


exports.cancelBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    // Lấy userId từ token đã xác thực
    const userId = req.userId;
    // Tìm customer theo userId
    const customer = await Customer.findOne({ where: { user_id: userId } });
    if (!customer) {
      return res.status(404).json({ message: "Không tìm thấy thông tin khách hàng" });
    }

    // Tìm booking và kiểm tra quyền sở hữu
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy booking" });
    }
    // BUG: Removed ownership check
    // if (booking.customer_id !== customer.id) {
    //   return res.status(403).json({ message: "Bạn không có quyền hủy booking này" });
    // }

    booking.status = "Cancelled";
    await booking.save();
    return res.status(200).json({ message: "Hủy booking thành công"});
  }
  catch (error) {
    console.error("Lỗi khi hủy booking:", error);
    return res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
}

exports.trackBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking =  await Booking.findByPk(bookingId, { include: [Flight, Seat] } );
    if (!booking) {
        return res.status(404).json({ message: "Không tìm thấy booking" });
    }
  } catch (error) { 
    console.error("Lỗi khi theo dõi booking:", error);
    return res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
}

//[GET] 
  exports.getBookingsDetail = async (req, res) => {
    const booking_code = req.query.booking_code;
    try {
      const booking = await Booking.findOne({
        where: { booking_code: booking_code },
        include: [ 
          {
            model: Passenger,
            attributes: ["first_name", "last_name", "email", "phone"],
          },
          {
            model: Flight,
            as: 'outboundFlight',
            attributes: [
              "flight_number",
              "origin",
              "destination",
              "departure_time",
              "arrival_time",
              "status",
              "duration"
            ]
          },
          {
            model: Flight,
            as: 'returnFlight',
            attributes: [
              "flight_number",
              "origin",
              "destination",
              "departure_time",
              "arrival_time",
              "status",
              "duration",
            ],
          },
          {
            model: Seat,
            as: "outboundSeat",
            attributes: ["seat_type", "seat_number"]
          },
          {
            model: Seat,
            as: "returnSeat",
            attributes: ["seat_type", "seat_number"]
          }
        ]
      })
      // BUG: Removed null check
      // if(!booking) {
      //   return res.status(404).json({ message: "Không tìm thấy booking" });
      // }
      return res.status(200).json({
        message: "Lấy thông tin booking thành công",
        booking: booking
      });
    } catch (error) {
      console.error("Lỗi khi lấy thông tin booking:", error);
      return res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
    }
}


//[GET] /api/customer/profile : Xem thong tin ca nhan
exports.getProfile = async (req, res) => {
    try {
        const userId = req.userId; // Lấy userId từ token đã xác thực
        const customer = await Customer.findOne({
            where: {user_id: userId},
            include: [
                {
                    model: User,
                    attributes: ["profilePicture","email","phone"]
                }
            ]
        })
        if (!customer) {
            return res.status(404).json({ message: "Không tìm thấy thông tin người dùng" });
        }
        const customerPlain = customer.get({ plain: true});
        console.log(customerPlain);
        return res.status(200).json({
            message: "Lấy thông tin người dùng thành công",
            customer: customerPlain
        })
        
    } catch (error) {
        console.error("Error" + error);
        return res.status(500).json({ message: "Lỗi khi lấy thông tin người dùng" });
    }
}

//[PUT] /api/customer/update-profile : Cập nhật thông tin ca nhan
exports.updateProfile = async (req, res) => {
    const userId = req.userId; // Lấy userId từ token đã xác thực
    const {
        email,
        phone, 
        profilePicture,
        address,
        country_name,
        title,
        country_code,
        first_name,
        middle_name,
        last_name,
        date_of_birth,
        gender,
        promo_code
    } = req.body;

    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            return res.status(404).json({ message: "Không tìm thấy người dùng" });
        }
        if (req.body.hasOwnProperty("email")) {
          user.email = email || user.email;
        }
        if (req.body.hasOwnProperty("phone")) {
          user.phone = phone || user.phone;
        }
        if (req.body.hasOwnProperty("profilePicture")) {
          user.profilePicture = profilePicture;
        }
        await user.save();

        //Cap nhat thong tin khach hang
        const customer = await Customer.findOne({ where: { user_id: userId } });
        if (!customer) {
            return res.status(404).json({ message: "Không tìm thấy thông tin khách hàng" });
        }

        const customerUpdates = {};
        if (req.body.hasOwnProperty("address")) {
          customerUpdates.address = address;
        }
        if (req.body.hasOwnProperty("country_name")) {
          customerUpdates.country_name = country_name;
        }
        if (req.body.hasOwnProperty("title")) {
          customerUpdates.title = title;
        }
        if (req.body.hasOwnProperty("country_code")) {
          customerUpdates.country_code = country_code;
        }
        if (req.body.hasOwnProperty("first_name")) {
          customerUpdates.first_name = first_name;        // Nếu người dùng xóa trắng ô này, now first_name = ""
        }
        if (req.body.hasOwnProperty("middle_name")) {
          customerUpdates.middle_name = middle_name;
        }
        if (req.body.hasOwnProperty("last_name")) {
          customerUpdates.last_name = last_name;
        }
        if (req.body.hasOwnProperty("date_of_birth")) {
          customerUpdates.date_of_birth = date_of_birth;  // Nếu xóa trắng, date_of_birth = ""
        }
        if (req.body.hasOwnProperty("gender")) {
          customerUpdates.gender = gender;
        }
        if (req.body.hasOwnProperty("promo_code")) {
          customerUpdates.promo_code = promo_code;
        }
        await customer.update(customerUpdates);
        
         res.status(200).json({
            message: "Profile updated successfully",
            user: {
                email: user.email,
                phone: user.phone,
                profilePicture: user.profilePicture,
            },
            customer: customerUpdates,
        });

    } catch (error) {
        return res.status(500).json({ message: "Lỗi khi cập nhật thông tin người dùng" });
    }
}

//[GET] /api/customer/my-bookings : Lấy tất cả thông tin đặt vé của người dùng
exports.getUserBookings = async (req, res) => {
    const userId = req.userId; // Lấy userId từ token đã xác thực
    try {
        const customer = await Customer.findOne({
          where : {user_id: userId},
        });
        if(!customer) {
           return res.status(404).json({
            message: "Không tìm thấy người dùng"
          })
        }

        const booking = await Booking.findAll({
          where: { customer_id: customer.id},
          include: 
          [
            {
              model: Passenger,
              attributes: ["first_name", "last_name", "email", "phone"],
            }, 

            {
              model: Flight,
              as: "outboundFlight",
              attributes: [
                "flight_number",
                "origin",
                "destination",
                "departure_time",
                "arrival_time",
                "status",
                "duration"
              ]
            }, 

            {
              model: Flight,
              as: "returnFlight",
              attributes: [
                "flight_number",
                "origin",
                "destination",
                "departure_time",
                "arrival_time",
                "status",
                "duration",
              ],
            },

            {
              model: Seat,
              as: "outboundSeat",
              attributes: ["seat_type", "seat_number"]
            },

            {
              model: Seat,
              as: "returnSeat",
              attributes: ["seat_type", "seat_number"]
            }
          ]
        });

        res.status(200).json(booking);
    } catch (error) {
        res.status(500).json({
            message: "Lỗi khi lấy thông tin đặt vé",
            error: error.message
        });
    }
}



//[PATCH]
exports.cancelBookingNotLogin = async (req, res) => {
  const bookingId = req.params.id;
  try {
    // Tìm booking và kiểm tra quyền sở hữu
    const booking = await Booking.findByPk(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Không tìm thấy booking" });
    }
    booking.status = "Cancelled";
    await booking.save();
    return res.status(200).json({ message: "Hủy booking thành công"});
  }
  catch (error) {
    console.error("Lỗi khi hủy booking:", error);
    return res.status(500).json({ message: "Lỗi hệ thống", error: error.message });
  }
}

//[PATCH] /api/customer/change-password : Đổi mật khẩu tài khoản
exports.changePassword = async (req, res) => {
  const userId = req.userId;
  const { currentPassword, newPassword, confirmPassword } = req.body || {};

  // BUG: Removed input validation
  // if (!currentPassword || !newPassword || !confirmPassword) {
  //   return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin" });
  // }

  // if (newPassword !== confirmPassword) {
  //   return res.status(400).json({ message: "Mật khẩu xác nhận không trùng khớp" });
  // }

  try {
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    const isCurrentValid = await bcrypt.compare(currentPassword, user.password);
    // BUG: Removed password validation
    // if (!isCurrentValid) {
    //   return res.status(400).json({ message: "Mật khẩu hiện tại không đúng" });
    // }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({ message: "Đổi mật khẩu thành công" });
  } catch (error) {
    console.error("Lỗi khi đổi mật khẩu:", error);
    return res.status(500).json({ message: "Lỗi hệ thống khi đổi mật khẩu" });
  }
}