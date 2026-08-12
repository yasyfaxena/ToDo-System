const { test } = require("node:test");
const assert = require("node:assert");
const request = require("supertest");

const app = require("../src/app");

test("GET /api/health returns 200", async () => {
  const response = await request(app)
    .get("/api/health");

  assert.strictEqual(response.statusCode, 200);
  assert.strictEqual(response.body.status, "ok");
  assert.strictEqual(response.body.service, "taskflow-api");
});

test("GET /api/todos requires authentication", async () => {
  const response = await request(app)
    .get("/api/todos");

  assert.strictEqual(response.statusCode, 401);
  assert.strictEqual(
    response.body.message,
    "Authentication required"
  );
});

test("POST /api/todos requires authentication", async () => {
  const response = await request(app)
    .post("/api/todos")
    .send({
      title: "Test task",
    });

  assert.strictEqual(response.statusCode, 401);
});

test("PATCH /api/todos/:id requires authentication", async () => {
  const response = await request(app)
    .patch("/api/todos/test-id")
    .send({
      title: "Updated task",
    });

  assert.strictEqual(response.statusCode, 401);
});

test("DELETE /api/todos/:id requires authentication", async () => {
  const response = await request(app)
    .delete("/api/todos/test-id");

  assert.strictEqual(response.statusCode, 401);
});
