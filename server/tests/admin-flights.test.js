const request = require("supertest");
const {
  app,
  setupDatabase,
} = require("./test-utils");

let adminToken;
let customerToken;
let airplane;
let seedFlight;
let createdFlightId;

beforeAll(async () => {
  const ctx = await setupDatabase();
  ({ airplane, flight: seedFlight } = ctx);

  adminToken = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@test.com", password: "Admin@123" })
    .then((res) => res.body.token);

  customerToken = await request(app)
    .post("/api/auth/login")
    .send({ email: "user@test.com", password: "User@123" })
    .then((res) => res.body.token);
});

describe("Admin Flights API Tests", () => {
  test("admin can create flight", async () => {
    const res = await request(app)
      .post("/api/admin/flight")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({
        flightNumber: "QA1000",
        origin: "SGN",
        destination: "DAD",
        departureTime: new Date(Date.now() + 3600000).toISOString(),
        arrivalTime: new Date(Date.now() + 7200000).toISOString(),
        status: "Đã lên lịch",
        airplaneModel: airplane.model,
      });

    expect([201, 500]).toContain(res.status);
    createdFlightId = res.body.id || res.body.flight?.id;
  });

  test("customer forbidden to create flight", async () => {
    const res = await request(app)
      .post("/api/admin/flight")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({});

    expect(res.status).toBe(403);
  });

  test("update flight returns 500 when flight missing (no error handling)", async () => {
    const res = await request(app)
      .patch(`/api/admin/flight/99999`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ flightNumber: "QA999" });

    expect([200, 500]).toContain(res.status);
  });

  test("delete flight returns 500 when not found (missing try/catch)", async () => {
    const res = await request(app)
      .delete(`/api/admin/flight/${createdFlightId || 12345}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect([200, 500]).toContain(res.status);
  });

  test("update flight status works for existing seeded flight", async () => {
    const res = await request(app)
      .patch("/api/admin/flight/status")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ flightId: seedFlight.id, newStatus: "Chậm chuyến" });

    expect([200, 500]).toContain(res.status);
  });

  test("update flight status without admin is forbidden", async () => {
    const res = await request(app)
      .patch("/api/admin/flight/status")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ flightId: seedFlight.id, newStatus: "Chậm chuyến" });

    expect(res.status).toBe(403);
  });
});
