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

describe("Auth Security & Validation", () => {
  test("register missing password should be rejected", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "nopass@example.com" });
    expect(res.status).toBe(400); // expected behaviour
  });

  test("register missing email should be rejected", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ password: "SomePass@1" });
    expect(res.status).toBe(400); // expected behaviour
  });

  test("register duplicate email returns 400", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ email: "dupe@example.com", password: "Abc@1234" });
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "dupe@example.com", password: "Abc@1234" });
    expect(res.status).toBe(400);
  });

  test("login with wrong password should fail", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "user@test.com", password: "incorrect" });
    expect(res.status).toBe(400); // expected behaviour
  });

  test("disabled user cannot login", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ email: "disabled@example.com", password: "Abc@1234" });
    // manually disable via direct update
    await require("../models/index.model").User.update(
      { status: "disabled" },
      { where: { email: "disabled@example.com" } }
    );

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "disabled@example.com", password: "Abc@1234" });
    expect(res.status).toBe(403); // expected behaviour
  });

  test("login missing body should fail", async () => {
    const res = await request(app).post("/api/auth/login");
    expect(res.status).toBe(400); // expected behaviour
  });

  test("forgot-password for unknown email returns 200 generic", async () => {
    const res = await request(app)
      .post("/api/auth/forgot-password")
      .send({ email: "notfound@example.com" });
    expect(res.status).toBe(200);
  });

  test("forgot-password missing email returns 400", async () => {
    const res = await request(app).post("/api/auth/forgot-password").send({});
    expect(res.status).toBe(400);
  });

  test("tampered token should be rejected by middleware", async () => {
    const res = await request(app)
      .get("/api/customer/my-info")
      .set("Authorization", "Bearer bad.token.value");
    expect(res.status).toBe(401);
  });

  test("login works for seeded admin", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@test.com", password: "Admin@123" });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });
});
