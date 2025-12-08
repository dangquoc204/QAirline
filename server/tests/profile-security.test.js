const request = require("supertest");
const { app, setupDatabase, createBookingForSeat } = require("./test-utils");

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
    .then((r) => r.body.token);
  customerToken = await request(app)
    .post("/api/auth/login")
    .send({ email: "user@test.com", password: "User@123" })
    .then((r) => r.body.token);
});

describe("Profile & Password Security", () => {
  test("update-profile without token is 401", async () => {
    const res = await request(app).patch("/api/customer/update-profile").send({ first_name: "X" });
    expect(res.status).toBe(401);
  });

  test("change-password missing fields should be 400", async () => {
    const res = await request(app)
      .patch("/api/customer/change-password")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({});
    expect(res.status).toBe(400); // expected behaviour
  });

  test("change-password with wrong current password should fail", async () => {
    const res = await request(app)
      .patch("/api/customer/change-password")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ currentPassword: "bad", newPassword: "New@123", confirmPassword: "New@123" });
    expect(res.status).toBe(400); // expected behaviour
  });

  test("my-bookings without token is 401", async () => {
    const res = await request(app).get("/api/customer/my-bookings");
    expect(res.status).toBe(401);
  });

  test("my-bookings after booking returns array", async () => {
    await createBookingForSeat(customerToken, flight, seats[0]);
    const res = await request(app)
      .get("/api/customer/my-bookings")
      .set("Authorization", `Bearer ${customerToken}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("my-info returns profile data", async () => {
    const res = await request(app)
      .get("/api/customer/my-info")
      .set("Authorization", `Bearer ${customerToken}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("customer");
  });

  test("admin token accepted for admin bookings", async () => {
    const res = await request(app)
      .get("/api/admin/bookings")
      .set("Authorization", `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
  });

  test("customer token forbidden on admin bookings", async () => {
    const res = await request(app)
      .get("/api/admin/bookings")
      .set("Authorization", `Bearer ${customerToken}`);
    expect(res.status).toBe(403);
  });
});
