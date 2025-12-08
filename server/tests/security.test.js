const request = require("supertest");
const { app, setupDatabase } = require("./test-utils");

let adminToken;
let customerToken;

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

describe("Security & Authorization Tests", () => {
  test("admin route without token is 401", async () => {
    const res = await request(app).post("/api/admin/post").send({});
    expect(res.status).toBe(401);
  });

  test("admin route with customer token is 403", async () => {
    const res = await request(app)
      .post("/api/admin/post")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ title: "X", content: "Y" });

    expect(res.status).toBe(403);
  });

  test("invalid token rejected", async () => {
    const res = await request(app)
      .get("/api/customer/my-info")
      .set("Authorization", "Bearer invalidtoken");
    expect(res.status).toBe(401);
  });

  test("auth middleware allows admin", async () => {
    const res = await request(app)
      .get("/api/admin/bookings")
      .set("Authorization", `Bearer ${adminToken}`);

    expect([200, 500]).toContain(res.status);
  });
});
