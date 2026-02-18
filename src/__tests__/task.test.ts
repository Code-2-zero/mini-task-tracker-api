import dotenv from "dotenv";
dotenv.config();
jest.mock("../config/redis", () => ({
  get: jest.fn(),
  setEx: jest.fn(),
  del: jest.fn(),
}));
import request from "supertest";
import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";
let mongoServer: MongoMemoryServer;
let token: string;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri);
});
afterAll(async () => {
  await mongoose.connection.close();
  await mongoServer.stop();
});
describe("Auth + Task flow", () => {
      it("should signup a user", async () => {
    const res = await request(app).post("/api/auth/signup").send({
      name: "Test User",
      email: "test@example.com",
      password: "password123",
    });
    console.log(res.body); 
    expect(res.statusCode).toBe(201);
  });
  it("should login user and return token", async () => {
  const res = await request(app).post("/api/auth/login").send({
    email: "test@example.com",
    password: "password123",
  });

  expect(res.statusCode).toBe(200);
  expect(res.body.token).toBeDefined();

  token = res.body.token;
});
it("should create a task", async () => {
  const res = await request(app)
    .post("/api/tasks")
    .set("Authorization", `Bearer ${token}`)
    .send({
      title: "Test Task",
      description: "Test description",
    });

  expect(res.statusCode).toBe(201);
  expect(res.body.task.title).toBe("Test Task");
});
it("should get tasks", async () => {
  const res = await request(app)
    .get("/api/tasks")
    .set("Authorization", `Bearer ${token}`);

  expect(res.statusCode).toBe(200);
  expect(res.body.tasks.length).toBeGreaterThan(0);
});
  });