# mini-task-tracker-api

A backend for a personal task tracker, built to get hands-on with a production-style stack. It's not trying to be a massive project,the goal was to wire together auth, a real database, caching, and tests in a way that actually makes sense together.



## What's in here

JWT auth (signup + login), full task CRUD, Redis caching per user, and a Dockerized setup so you don't have to install Mongo and Redis locally if you don't want to. Tests use an in-memory MongoDB instance so nothing real gets touched.

**Stack:** Node.js · TypeScript · Express · MongoDB (Mongoose) · Redis · Jest + Supertest · Docker

---

## Project layout

```
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
```

---

## Getting started

**Option 1 — Docker (easiest)**

```bash
docker compose up --build
```

Spins up the API, MongoDB, and Redis together. API runs at `http://localhost:5001`.

```bash
docker compose down   # to stop
```

**Option 2 — Local dev**

Make sure you have MongoDB and Redis running, then:

```bash
npm install
npm run dev
```

---

## Environment variables

Create a `.env` file (see `.env.example`):

```
PORT=5001
MONGO_URI=mongodb://mongo:27017/tasks
REDIS_URL=redis://redis:6379
JWT_SECRET=your_jwt_secret
```

---

## API

### Auth

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create an account |
| POST | `/api/auth/login` | Get a JWT token |

### Tasks

All task routes require `Authorization: Bearer <token>`.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List your tasks (cached) |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

---

## Caching

Tasks are cached in Redis under `tasks:<userId>`. The cache gets cleared whenever you create, update, or delete a task — nothing fancy, just enough to avoid hitting the DB on every GET.

---

## Testing

```bash
npm run test
npm run test:coverage
```

Coverage is around 75%. Tests run against `mongodb-memory-server` so no real DB needed.

---

## A few things I'd add next

- Task filtering by status or due date
- Refresh tokens
- Rate limiting
- CI pipeline

---

## Author

Kamini Chanchal
