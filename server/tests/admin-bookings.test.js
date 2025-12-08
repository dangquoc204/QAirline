const request = require("supertest");
const {
  app,
  setupDatabase,
  createBookingForSeat,
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

  await createBookingForSeat(customerToken, flight, seats[0]);
});

describe("Admin Bookings API Tests", () => {
  test("admin can view bookings list", async () => {
    const res = await request(app)
      .get("/api/admin/bookings")
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.bookings)).toBe(true);
  });

  test("customer forbidden to view bookings", async () => {
    const res = await request(app)
      .get("/api/admin/bookings")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(res.status).toBe(403);
  });
});
