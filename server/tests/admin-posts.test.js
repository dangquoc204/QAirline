const request = require("supertest");
const {
  app,
  setupDatabase,
} = require("./test-utils");

let adminToken;
let customerToken;
let postId;

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

describe("Admin Posts API Tests", () => {
  test("admin can create post", async () => {
    const res = await request(app)
      .post("/api/admin/post")
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ title: "Sale", content: "Big sale", postType: "promo" });

    expect(res.status).toBe(201);
    postId = res.body.post.id;
  });

  test("customer forbidden to create post", async () => {
    const res = await request(app)
      .post("/api/admin/post")
      .set("Authorization", `Bearer ${customerToken}`)
      .send({ title: "Hack", content: "No" });

    expect(res.status).toBe(403);
  });

  test("edit post with empty title returns 400", async () => {
    const res = await request(app)
      .patch(`/api/admin/post/${postId}`)
      .set("Authorization", `Bearer ${adminToken}`)
      .send({ title: "" });

    expect(res.status).toBe(400);
  });

  test("delete post succeeds", async () => {
    const res = await request(app)
      .delete(`/api/admin/post/${postId}`)
      .set("Authorization", `Bearer ${adminToken}`);

    expect(res.status).toBe(200);
  });
});
