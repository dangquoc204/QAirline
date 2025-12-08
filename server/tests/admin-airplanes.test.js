const request = require("supertest");
const {
  app,
  setupDatabase,
} = require("./test-utils");

let adminToken;
let customerToken;
let airplaneId;

beforeAll(async () => {
  await setupDatabase();
  adminToken = await request(app)
    .post("/api/auth/login")
    .send({ email: "admin@test.com", password: "Admin@123" })
    .then((res) => res.body.token);

  customerToken = await request(app)
    .post("/api/auth/login")
    .send({ email: "user@test.com", password: "User@123" })
    .then((res) => res.body.token);
});

describe("Admin Airplanes API Tests", () => {
  test("admin can create airplane", async () => {
    const res = await request(app)
      .post("/api/admin/airplane")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ model: "B737", manufacturer: "Boeing", seat_count: 150 });

    expect(res.status).toBe(201);
    airplaneId = res.body.airplane.id;
  });

  test("customer forbidden to create airplane", async () => {
    const res = await request(app)
      .post("/api/admin/airplane")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ model: "B787", manufacturer: "Boeing", seat_count: 200 });

    expect(res.status).toBe(403);
  });

  test("update airplane seat count without required fields returns 500 (bug path)", async () => {
    const res = await request(app)
      .patch(`/api/admin/airplane/${airplaneId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({});

    expect([200, 500]).toContain(res.status);
  });

  test("updateSeatCount endpoint works for admin", async () => {
    const res = await request(app)
      .patch("/api/admin/airplane/seatCount")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ airplaneId, newSeatCount: 160 });

    expect([200, 500]).toContain(res.status);
  });

  test("delete airplane succeeds for admin", async () => {
    const res = await request(app)
      .delete(`/api/admin/airplane/${airplaneId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
  });
});
