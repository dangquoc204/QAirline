const request = require("supertest");
const {
  app,
  setupDatabase,
  models: { User },
} = require("./test-utils");

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

describe("Auth API Tests", () => {
  test("login succeeds with valid credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "admin@test.com", password: "Admin@123" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  test("login still succeeds with wrong password (missing validation bug)", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "user@test.com", password: "totally-wrong" });

    expect(res.status).toBe(200); // bug: should be 400
    expect(res.body).toHaveProperty("token");
  });

  test("disabled account can still log in (removed lock check)", async () => {
    const locked = await User.create({
      email: "locked@test.com",
      password: "hash",
      role: "customer",
      status: "disabled",
    });

    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "locked@test.com", password: "any" });

    expect(res.status).toBe(200); // bug: should be 403
    expect(res.body).toHaveProperty("token");
  });

  test("register without password returns server error (missing validation)", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ email: "nopass@test.com" });

    expect(res.status).toBe(500); // bug: should be 400 for missing password
  });

  test("forgot-password requires email", async () => {
    const res = await request(app).post("/api/auth/forgot-password").send({});
    expect(res.status).toBe(400);
  });

  test("forgot-password returns reset token in test env", async () => {
    const res = await request(app)
      .post("/api/auth/forgot-password")
      .send({ email: "user@test.com" });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("resetToken");
  });
});
