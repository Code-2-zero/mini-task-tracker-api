📝 Mini Task Tracker API
A production-style backend for a Task Tracker application built with Node.js, TypeScript, Express, MongoDB, and Redis.
This project demonstrates secure authentication, per-user task management, Redis caching, automated testing, and a fully containerized development environment using Docker Compose.
🚀 Features
🔐 JWT-based authentication (Signup & Login)
👤 User & Task models with Mongoose
✅ Task CRUD (Create, Read, Update, Delete)
🧠 Per-user Redis caching for task listing
♻️ Cache invalidation on task updates
🧪 Unit & integration testing with Jest
📊 ~75% test coverage
🐳 Dockerized setup (API + MongoDB + Redis)
📦 Environment-based configuration
🏗 Tech Stack
Backend: Node.js, Express, TypeScript
Database: MongoDB + Mongoose
Caching: Redis
Authentication: JWT + bcrypt
Testing: Jest, Supertest, mongodb-memory-server
Containerization: Docker, Docker Compose
📂 Project Structure
src/
 ┣ config/
 ┣ controllers/
 ┣ middlewares/
 ┣ models/
 ┣ routes/
 ┣ services/
 ┣ __tests__/
 ┣ app.ts
 ┗ server.ts
⚙️ Environment Variables
Create a .env file in the root:
PORT=5001
MONGO_URI=mongodb://mongo:27017/tasks
REDIS_URL=redis://redis:6379
JWT_SECRET=your_jwt_secret
💻 Run Locally (Development Mode)
Make sure MongoDB and Redis are running locally.
npm install
npm run dev
Server runs at:
http://localhost:5001
🐳 Run with Docker (Recommended)
Start the full system:
docker compose up --build
This starts:
API → http://localhost:5001
MongoDB
Redis
Stop containers:
docker compose down
🔐 API Endpoints
Auth
Signup
POST /api/auth/signup
Login
POST /api/auth/login
Tasks (Protected Routes)
Require header:
Authorization: Bearer <token>
Get all tasks
GET /api/tasks
Create task
POST /api/tasks
Update task
PUT /api/tasks/:id
Delete task
DELETE /api/tasks/:id
⚡ Redis Caching Strategy
Tasks are cached per user
Cache key → tasks:<userId>
Cache invalidated on:
Task creation
Task update
Task deletion
🧠 MongoDB Indexing
Indexes applied on:
owner
status
for efficient querying.
🧪 Running Tests
npm run test
npm run test:coverage
📊 Test Coverage
Current backend test coverage: ~75%
🛡 Security
Password hashing with bcrypt
JWT-based authentication
Protected routes with middleware
Environment-based secrets
✨ Developer Workflow
Local development
npm run dev
Full Docker environment
docker compose up
📌 Future Improvements
Task filtering (status / due date)
Refresh tokens
Rate limiting
CI pipeline for automated testing
👩‍💻 Author
Kamini Chanchal
📄 Sample .env.example
Create a file named .env.example in the root:
PORT=5001
MONGO_URI=mongodb://mongo:27017/tasks
REDIS_URL=redis://redis:6379
JWT_SECRET=your_jwt_secret