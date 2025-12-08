const request = require("supertest");
const {
  app,
  setupDatabase,
  createBookingForSeat,
  models: { Booking },
} = require("./test-utils");

let customerToken;
let adminToken;
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

describe("Payment-related Booking API Tests", () => {
  test("booking marks payment as Paid immediately", async () => {
    const res = await createBookingForSeat(customerToken, flight, seats[0]);
    expect(res.status).toBe(201);
    const booking = await Booking.findByPk(res.body.id);
    expect(booking.payment_status).toBe("Paid");
  });

  test("booking without paymentDetails gets rejected on logged-in flow", async () => {
    const payload = {
      totalPrice: 99,
      outboundFlight: { id: flight.id, seat_id: seats[1].id, departure_time: flight.departure_time },
      returnFlight: null,
      passengerDetails: {
        firstName: "NoPay",
        lastName: "User",
        email: "no@pay.com",
        phone: "123",
      },
      booking_code: `NP${Math.floor(Math.random() * 10000)}`,
    };

    const res = await request(app)
      .post("/api/customer/bookForLogin")
      .set("Authorization", `Bearer ${customerToken}`)
      .send(payload);

    expect(res.status).toBe(400);
  });

  test("guest booking accepts missing payment validation (bug)", async () => {
    const res = await request(app)
      .post("/api/customer/bookForNotLogin")
      .send({
        totalPrice: null,
        outboundFlight: { id: flight.id, seat_id: seats[1].id, departure_time: flight.departure_time },
        returnFlight: null,
        passengerDetails: {
          firstName: "Guest",
          lastName: "NoPay",
          email: "guest@example.com",
          phone: "000",
        },
        paymentDetails: null,
        booking_code: `BUG${Math.floor(Math.random() * 10000)}`,
      });

    expect(res.status).toBe(201); // bug: should fail when paymentDetails missing
  });
});
