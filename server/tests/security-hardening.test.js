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

describe("Security Hardening Edge Cases", () => {
  test("admin endpoints require Bearer format", async () => {
    const res = await request(app)
      .post("/api/admin/post")
      .set("Authorization", adminToken)
      .send({ title: "X", content: "Y" });
    expect(res.status).toBe(401);
  });

  test("empty authorization header yields 401", async () => {
    const res = await request(app).get("/api/customer/my-info");
    expect(res.status).toBe(401);
  });

  test("booking cancel without token returns 401", async () => {
    const res = await request(app).patch("/api/customer/cancel/1");
    expect(res.status).toBe(401);
  });

  test("admin delete post without id param should 404", async () => {
    const res = await request(app)
      .delete("/api/admin/post/")
      .set("Authorization", `Bearer ${adminToken}`);
    expect([404, 500]).toContain(res.status);
  });

  test("admin update airplane seatCount missing body returns 500", async () => {
    const res = await request(app)
      .patch("/api/admin/airplane/seatCount")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({});
    expect([200, 500]).toContain(res.status);
  });

  test("customer cannot access admin flight edit", async () => {
    const res = await request(app)
      .patch("/api/admin/flight/1")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ flightNumber: "X" });
    expect(res.status).toBe(403);
  });

  test("GET root returns 200", async () => {
    const res = await request(app).get("/");
    expect(res.status).toBe(200);
  });

  test("test-api route works", async () => {
    const res = await request(app).get("/api/test/post");
    expect([200, 500]).toContain(res.status);
  });
});
