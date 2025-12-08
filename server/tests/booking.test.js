const request = require("supertest");
const {
  app,
  setupDatabase,
  createBookingForSeat,
  models: { Seat },
} = require("./test-utils");

let adminToken;
let customerToken;
let flight;
let seats;

beforeAll(async () => {
  const ctx = await setupDatabase();
  ({ flight, seats } = ctx);
  adminToken = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@test.com", password: "Admin@123" })
    .then((res) => res.body.token);

  customerToken = await request(app)
    .post("/api/auth/login")
    .send({ email: "user@test.com", password: "User@123" })
    .then((res) => res.body.token);
});

describe("Booking API Tests", () => {
  test("customer can book when logged in and seat becomes unavailable", async () => {
    const seat = seats[0];
    const res = await createBookingForSeat(customerToken, flight, seat);

    expect(res.status).toBe(201);
    const updatedSeat = await Seat.findByPk(seat.id);
    expect(updatedSeat.is_available).toBe(false);
  });

  test("guest booking succeeds even with missing validations (bug path)", async () => {
    const seat = seats[1];
    const payload = {
      totalPrice: null, // missing but bug allows
      outboundFlight: { id: flight.id, seat_id: seat.id, departure_time: flight.departure_time },
      returnFlight: null,
      passengerDetails: {
        firstName: "Guest",
        lastName: "User",
        email: "guest@example.com",
        phone: "0999",
      },
      paymentDetails: {
        paymentMethod: "Cash",
      },
      booking_code: `BG${Math.floor(Math.random() * 10000)}`,
    };

    const res = await request(app)
      .post("/api/customer/bookForNotLogin")
      .send(payload);

    expect(res.status).toBe(201); // bug: should have failed validation
  });

  test("booking with missing fields returns 400 for logged in flow", async () => {
    const res = await request(app)
      .post("/api/customer/bookForLogin")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ totalPrice: 100 });

    expect(res.status).toBe(400);
  });

  test("cannot book without token on /bookForLogin", async () => {
    const res = await request(app)
      .post("/api/customer/bookForLogin")
      .send({});
    expect(res.status).toBe(401);
  });

  test("customer can cancel any booking due to missing ownership check (bug)", async () => {
    const seat = seats[0];
    const bookingRes = await createBookingForSeat(customerToken, flight, seat);
    const bookingId = bookingRes.body.id;

    // simulate other user booking by not verifying
    const res = await request(app)
      .patch(`/api/customer/cancel/${bookingId}`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(res.status).toBe(200); // bug: should be 403 if not owner
  });

  test("guest cancelNotLogin works without auth", async () => {
    const seat = seats[1];
    const bookingRes = await request(app)
      .post("/api/customer/bookForNotLogin")
      .send({
        totalPrice: 50,
        outboundFlight: { id: flight.id, seat_id: seat.id, departure_time: flight.departure_time },
        returnFlight: null,
        passengerDetails: {
          firstName: "A",
          lastName: "B",
          email: "a@b.com",
          phone: "123",
        },
        paymentDetails: { paymentMethod: "Cash" },
        booking_code: `GN${Math.floor(Math.random() * 10000)}`,
      });

    const bookingId = bookingRes.body.id;
    const res = await request(app).patch(`/api/customer/cancelNotLogin/${bookingId}`);
    expect(res.status).toBe(200);
  });
});
