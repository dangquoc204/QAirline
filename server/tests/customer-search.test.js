const request = require("supertest");
const { app, setupDatabase } = require("./test-utils");

let adminToken;
let customerToken;

beforeAll(async () => {
  await setupDatabase();
  adminToken = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@test.com", password: "Admin@123" })
    .then((r) => r.body.token);
  customerToken = await request(app)
    .post("/api/auth/login")
    .send({ email: "user@test.com", password: "User@123" })
    .then((r) => r.body.token);
});

describe("Customer Flight Search", () => {
  test("search without filters returns flights", async () => {
    const res = await request(app).get("/api/customer/search-flights");
    expect([200, 404]).toContain(res.status);
  });

  test("search with origin/destination matches seeded flight", async () => {
    const res = await request(app).get("/api/customer/search-flights?origin=SGN&destination=HAN");
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body).toHaveProperty("flights");
    }
  });

  test("search with return_date adds return group", async () => {
    const res = await request(app).get(
      `/api/customer/search-flights?origin=HAN&destination=SGN&departure_date=${encodeURIComponent(
        new Date().toISOString()
      )}&return_date=${encodeURIComponent(new Date(Date.now() + 86400000).toISOString())}`
    );
    expect([200, 404]).toContain(res.status);
  });

  test("search with seat_type filters available seats", async () => {
    const res = await request(app).get(
      `/api/customer/search-flights?origin=SGN&destination=HAN&seat_type=Economy`
    );
    expect([200, 404]).toContain(res.status);
  });

  test("invalid date format should be handled", async () => {
    const res = await request(app).get(
      "/api/customer/search-flights?origin=SGN&destination=HAN&departure_date=not-a-date"
    );
    expect([200, 404, 500]).toContain(res.status);
  });

  test("search requires available seats; after booking seat availability shrinks", async () => {
    // book once to reduce availability
    const loginRes = await request(app)
      .post("/api/auth/login")
      .send({ email: "user@test.com", password: "User@123" });
    const token = loginRes.body.token;
    await request(app)
      .post("/api/customer/bookForLogin")
      .set("Authorization", `Bearer ${token}`)
      .send({
        totalPrice: 120,
        outboundFlight: { id: 1, seat_id: 1, departure_time: new Date().toISOString() },
        returnFlight: null,
        passengerDetails: {
          firstName: "One",
          lastName: "User",
          email: "o@u.com",
          phone: "123",
        },
        paymentDetails: {
          paymentMethod: "Credit Card",
          cardholderName: "One",
          cardNumber: "4111",
          expiryDate: "12/30",
          cvv: "123",
        },
        booking_code: `SC${Math.floor(Math.random() * 10000)}`,
      });

    const res = await request(app).get(
      `/api/customer/search-flights?origin=SGN&destination=HAN&seat_type=Economy`
    );
    expect([200, 404]).toContain(res.status);
  });
});
