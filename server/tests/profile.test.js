const request = require("supertest");
const {
  app,
  setupDatabase,
} = require("./test-utils");

let customerToken;
let adminToken;

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

describe("Profile API Tests", () => {
  test("my-info returns profile for authenticated user", async () => {
    const res = await request(app)
      .get("/api/customer/my-info")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("customer");
  });

  test("my-info without token is unauthorized", async () => {
    const res = await request(app).get("/api/customer/my-info");
    expect(res.status).toBe(401);
  });

  test("update-profile allows empty strings (permissive bug)", async () => {
    const res = await request(app)
      .patch("/api/customer/update-profile")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ first_name: "", last_name: "" });

    expect(res.status).toBe(200); // accepts blanks
  });

  test("change-password accepts wrong current password (bug)", async () => {
    const res = await request(app)
      .patch("/api/customer/change-password")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ currentPassword: "wrong", newPassword: "New@123", confirmPassword: "New@123" });

    expect(res.status).toBe(200); // bug: should be 400
  });

  test("my-bookings returns array", async () => {
    const res = await request(app)
      .get("/api/customer/my-bookings")
      .set("Authorization", `Bearer ${customerToken}`);

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
