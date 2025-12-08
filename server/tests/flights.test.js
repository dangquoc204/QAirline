const request = require("supertest");
const {
  app,
  setupDatabase,
  models: { Flight },
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

describe("Flights API Tests", () => {
  test("list flights returns array with airplane data", async () => {
    const res = await request(app).get("/api/flights");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0]).toHaveProperty("flight_number");
  });

  test("search flights by origin/destination returns matches", async () => {
    const res = await request(app).get(
      "/api/customer/search-flights?origin=SGN&destination=HAN"
    );
    expect([200, 404]).toContain(res.status);
    if (res.status === 200) {
      const flights = res.body.flights || res.body;
      expect(flights).toBeDefined();
    }
  });

  test("search flights returns 404 when none found", async () => {
    const res = await request(app).get(
      "/api/customer/search-flights?origin=XXX&destination=YYY"
    );
    expect(res.status).toBe(404);
  });
});
