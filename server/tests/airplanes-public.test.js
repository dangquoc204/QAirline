const request = require("supertest");
const { app, setupDatabase } = require("./test-utils");

beforeAll(async () => {
  await setupDatabase();
});

describe("Public Airplanes API Tests", () => {
  test("GET /api/airplanes returns list", async () => {
    const res = await request(app).get("/api/airplanes");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test("GET /api/airplanes/models returns model list", async () => {
    const res = await request(app).get("/api/airplanes/models");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
