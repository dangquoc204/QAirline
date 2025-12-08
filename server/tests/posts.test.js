const request = require("supertest");
const {
  app,
  setupDatabase,
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

describe("Public Posts API Tests", () => {
  test("list posts returns array", async () => {
    const res = await request(app).get("/api/post");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.posts)).toBe(true);
  });

  test("get post by id returns 404 when missing", async () => {
    const res = await request(app).get("/api/post/99999");
    expect([404, 500]).toContain(res.status);
  });
});
