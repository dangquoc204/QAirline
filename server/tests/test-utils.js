const bcrypt = require("bcrypt");
const request = require("supertest");
const app = require("../index");
const {
  sequelize,
  User,
  Customer,
  Admin,
  Airplane,
  Flight,
  Seat,
  Booking,
  Passenger,
} = require("../models/index.model");

const ensureEnv = () => {
  process.env.NODE_ENV = process.env.NODE_ENV || "test";
  process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";
};

const baseTimes = () => {
  const now = Date.now();
  return {
    departure: new Date(now + 60 * 60 * 1000),
    arrival: new Date(now + 2 * 60 * 60 * 1000),
  };
};

const setupDatabase = async () => {
  ensureEnv();
  await sequelize.sync({ force: true });
  const adminPassword = await bcrypt.hash("Admin@123", 10);
  const customerPassword = await bcrypt.hash("User@123", 10);

  const adminUser = await User.create({
    email: "admin@test.com",
    password: adminPassword,
    role: "admin",
    status: "active",
  });
  await Admin.create({
    user_id: adminUser.id,
    username: "admin",
    password: adminPassword,
    permissions: "[]",
  });

  const customerUser = await User.create({
    email: "user@test.com",
    password: customerPassword,
    role: "customer",
    status: "active",
  });
  const customer = await Customer.create({
    user_id: customerUser.id,
    first_name: "Test",
    last_name: "User",
    gender: "male",
    title: "Mr",
    country_name: "VN",
  });

  const { flight, seats, airplane } = await seedFlightWithSeats();

  return { adminUser, customerUser, customer, flight, seats, airplane };
};

const seedFlightWithSeats = async () => {
  const { departure, arrival } = baseTimes();
  const airplane = await Airplane.create({
    model: `A320-${Date.now()}`,
    manufacturer: "Airbus",
    seat_count: 180,
  });
  const flight = await Flight.create({
    flight_number: `QA${Math.floor(Math.random() * 100000)}`,
    origin: "SGN",
    destination: "HAN",
    departure_time: departure,
    arrival_time: arrival,
    duration: "2h0m",
    status: "Đã lên lịch",
    airplane_id: airplane.id,
  });
  const seatA = await Seat.create({
    flight_id: flight.id,
    seat_type: "Economy",
    seat_number: `E${Math.floor(Math.random() * 90)}`,
    is_available: true,
    price: 100,
  });
  const seatB = await Seat.create({
    flight_id: flight.id,
    seat_type: "Premium",
    seat_number: `P${Math.floor(Math.random() * 90)}`,
    is_available: true,
    price: 150,
  });
  return { flight, seats: [seatA, seatB], airplane };
};

const loginAs = async (email, password) => {
  const res = await request(app)
    .post("/api/auth/login")
    .send({ email, password });
  return res.body.token;
};

const createBookingForSeat = async (customerToken, flight, seat) => {
  const payload = {
    totalPrice: 120,
    outboundFlight: {
      id: flight.id,
      seat_id: seat.id,
      departure_time: flight.departure_time,
    },
    returnFlight: null,
    passengerDetails: {
      firstName: "Test",
      lastName: "Passenger",
      email: "passenger@example.com",
      phone: "0123",
    },
    paymentDetails: {
      paymentMethod: "Credit Card",
      cardholderName: "Test Passenger",
      cardNumber: "4111",
      expiryDate: "12/30",
      cvv: "123",
    },
    booking_code: `BC${Math.floor(Math.random() * 100000)}`,
  };

  return request(app)
    .post("/api/customer/bookForLogin")
    .set("Authorization", `Bearer ${customerToken}`)
    .send(payload);
};

module.exports = {
  app,
  setupDatabase,
  seedFlightWithSeats,
  loginAs,
  createBookingForSeat,
  models: {
    sequelize,
    User,
    Customer,
    Admin,
    Airplane,
    Flight,
    Seat,
    Booking,
    Passenger,
  },
};
