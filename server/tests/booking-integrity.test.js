const request = require("supertest");
const {
  app,
  setupDatabase,
  createBookingForSeat,
  models: { Seat },
} = require("./test-utils");

let customerToken;
let secondUserToken;
let adminToken;
let flight;
let seats;

beforeAll(async () => {
  const ctx = await setupDatabase();
  ({ flight, seats } = ctx);

  adminToken = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@test.com", password: "Admin@123" })
    .then((r) => r.body.token);
  customerToken = await request(app)
    .post("/api/auth/login")
    .send({ email: "user@test.com", password: "User@123" })
    .then((r) => r.body.token);

  await request(app)
    .post("/api/auth/register")
    .send({ email: "second@test.com", password: "User@123" });
  secondUserToken = await request(app)
    .post("/api/auth/login")
    .send({ email: "second@test.com", password: "User@123" })
    .then((r) => r.body.token);
});

describe("Booking Integrity & Ownership", () => {
  test("double booking same seat should be blocked", async () => {
    const seat = seats[0];
    await createBookingForSeat(customerToken, flight, seat);
    const res = await createBookingForSeat(customerToken, flight, seat);
    expect(res.status).toBe(400); // expected behaviour
  });

  test("booking with returnFlight updates both seats", async () => {
    const payload = {
      totalPrice: 200,
      outboundFlight: { id: flight.id, seat_id: seats[0].id, departure_time: flight.departure_time },
      returnFlight: { id: flight.id, seat_id: seats[1].id, departure_time: flight.departure_time },
      passengerDetails: {
        firstName: "Round",
        lastName: "Trip",
        email: "rt@example.com",
        phone: "123",
      },
      paymentDetails: {
        paymentMethod: "Credit Card",
        cardholderName: "Round Trip",
        cardNumber: "4111",
        expiryDate: "12/30",
        cvv: "123",
      },
      booking_code: `RT${Math.floor(Math.random() * 10000)}`,
    };
    const res = await request(app)
      .post("/api/customer/bookForLogin")
      .set("Authorization", `Bearer ${customerToken}`)
      .send(payload);
    expect(res.status).toBe(201);
    const outSeat = await Seat.findByPk(seats[0].id);
    const retSeat = await Seat.findByPk(seats[1].id);
    expect(outSeat.is_available).toBe(false);
    expect(retSeat.is_available).toBe(false);
  });

  test("guest booking missing payment should be rejected", async () => {
    const res = await request(app)
      .post("/api/customer/bookForNotLogin")
      .send({
        totalPrice: 50,
        outboundFlight: { id: flight.id, seat_id: seats[0].id, departure_time: flight.departure_time },
        returnFlight: null,
        passengerDetails: { firstName: "G", lastName: "U", email: "g@u.com", phone: "123" },
        booking_code: `GP${Math.floor(Math.random() * 10000)}`,
      });
    expect(res.status).toBe(400); // expected behaviour
  });

  test("cancel by different user should be forbidden", async () => {
    const seat = seats[0];
    const bookingRes = await createBookingForSeat(customerToken, flight, seat);
    const bookingId = bookingRes.body.id;
    const res = await request(app)
      .patch(`/api/customer/cancel/${bookingId}`)
      .set("Authorization", `Bearer ${secondUserToken}`);
    expect(res.status).toBe(403); // expected behaviour
  });

  test("cancelNotLogin with invalid id returns 404", async () => {
    const res = await request(app).patch("/api/customer/cancelNotLogin/999999");
    expect(res.status).toBe(404);
  });

  test("booking detail missing code should 400", async () => {
    const res = await request(app)
      .get("/api/customer/booking-detail")
      .set("Authorization", `Bearer ${customerToken}`);
    expect(res.status).toBe(400); // expected behaviour
  });

  test("track booking unknown id returns 404", async () => {
    const res = await request(app)
      .get("/api/customer/booking/999999")
      .set("Authorization", `Bearer ${customerToken}`);
    expect(res.status).toBe(404);
  });

  test("booking without auth on /bookForLogin is 401", async () => {
    const res = await request(app)
      .post("/api/customer/bookForLogin")
      .send({ totalPrice: 1 });
    expect(res.status).toBe(401);
  });

  test("customer cannot delete via admin delete flight", async () => {
    const res = await request(app)
      .delete(`/api/admin/flight/${flight.id}`)
      .set("Authorization", `Bearer ${customerToken}`);
    expect(res.status).toBe(403);
  });

  test("admin can see bookings list after creations", async () => {
    const res = await request(app)
      .get("/api/admin/bookings")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });
});
