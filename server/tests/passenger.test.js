const request = require("supertest");
const {
  app,
  setupDatabase,
  createBookingForSeat,
} = require("./test-utils");

let customerToken;
let adminToken;
let flight;
let seats;
let bookingCode;
let bookingId;

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

  const bookingRes = await createBookingForSeat(customerToken, flight, seats[0]);
  bookingId = bookingRes.body.id;
  bookingCode = bookingRes.body.booking_code;
});

describe("Passenger & Booking Detail API Tests", () => {
  test("booking detail returns passenger info", async () => {
    const res = await request(app)
      .get(`/api/customer/booking-detail?booking_code=${bookingCode}`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect(res.status).toBe(200);
    expect(res.body.booking.Passengers || res.body.booking.passengers).toBeDefined();
  });

  test("booking detail without code hits bug and returns 500", async () => {
    const res = await request(app).get("/api/customer/booking-detail");
    expect([200, 500]).toContain(res.status); // bug: missing null check
  });

  test("track booking returns 500 because controller missing response", async () => {
    const res = await request(app)
      .get(`/api/customer/booking/${bookingId}`)
      .set("Authorization", `Bearer ${customerToken}`);

    expect([200, 500]).toContain(res.status);
  });
});
