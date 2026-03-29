# Role-Based Access Backend — Scalable REST API + Frontend

A production-ready REST API built with **Node.js**, **Express**, and **MongoDB** featuring JWT authentication, role-based access control (RBAC), full CRUD operations, Swagger documentation, and a Vanilla JS frontend test console — all served from a single server.

---

## Live Demo

| Resource | URL |
|---|---|
| Frontend UI | `https://role-based-access-backend-e8hf.onrender.com` |
| Swagger Docs | `https://role-based-access-backend-e8hf.onrender.com/api-docs` |
| API Base | `https://role-based-access-backend-e8hf.onrender.com/api/v1` |

---

## Demo Admin Credentials

Use this account for evaluator access to admin endpoints:

- Email: `admin@gmail.com`
- Password: `admin123`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js v5 |
| Database | MongoDB (via Mongoose) |
| Auth | JWT (JSON Web Tokens) + bcrypt |
| Validation | express-validator |
| File Storage | ImageKit (optional file uploads) |
| API Docs | Swagger UI (swagger-jsdoc + swagger-ui-express) |
| Frontend | Vanilla JS (ES Modules) |

---

## Features

### Backend
- **User Registration & Login** with bcrypt password hashing
- **JWT Authentication** via `Authorization: Bearer` header or `httpOnly` cookie
- **Role-Based Access Control** — `user` and `admin` roles with separate protected routes
- **Music CRUD** — users manage their own records; admins manage all records
- **Music Approval Workflow** — new entries start as `pending`, admin can `approve`
- **Optional File Upload** — attach audio files via ImageKit CDN
- **API Versioning** — all routes under `/api/v1`
- **Input Validation** — field-level validation with structured error responses
- **Global Error Handling** — centralised 404 and error middleware
- **Swagger UI** — interactive API documentation

### Frontend
- **Register & Login** forms with smart username/email detection
- **JWT session management** — token persisted in `localStorage`, sent as Bearer header
- **Protected dashboard** — shows user ID, username, email, role after login
- **Music CRUD panel** — create, update, delete, list your music
- **Admin panel** — approve music, delete any entry, list all entries
- **Response console** — every API response printed in real-time with success/error styling

---

## Project Structure

```
spotifybackend/
├── backend/
│   ├── server.js                  # Entry point — starts HTTP server
│   ├── package.json
│   ├── docs/
│   │   └── SpotifyBackend.postman_collection.json
│   └── src/
│       ├── app.js                 # Express app, middleware, route mounting
│       ├── controllers/
│       │   ├── auth.controller.js # register, login, logout, me
│       │   └── music.controller.js# createMusic, getMyMusic, updateMusic, deleteMyMusic, getAllMusic, confirmMusic, deleteMusic
│       ├── db/
│       │   └── db.js              # MongoDB connection via Mongoose
│       ├── docs/
│       │   └── swagger.js         # Swagger/OpenAPI 3.0 spec config
│       ├── middlewares/
│       │   ├── auth.middleware.js  # authUser (JWT verify), authAdmin (role check)
│       │   ├── error.middleware.js # notFoundHandler, errorHandler
│       │   └── validation.middleware.js # express-validator result handler
│       ├── models/
│       │   ├── user.model.js      # Schema: username, email, password, role (user|admin)
│       │   └── music.model.js     # Schema: title, artist (ref), fileUrl, fileId, status (pending|approved)
│       ├── routes/
│       │   ├── auth.routes.js     # /api/v1/auth/*
│       │   └── music.routes.js    # /api/v1/music/*
│       ├── services/
│       │   └── storage.service.js # ImageKit upload/delete helpers
│       └── validators/
│           ├── auth.validator.js  # registerValidator, loginValidator
│           └── music.validator.js # createMusicValidator, updateMusicValidator, musicIdParamValidator
└── frontend/
    ├── index.html                 # Single-page UI
    └── assets/
        ├── css/
        │   └── styles.css         # Custom design system (CSS variables, cards, forms)
        └── js/
            ├── main.js            # Entry point — binds all event modules
            ├── api.js             # callApi() — fetch wrapper with auth header injection
            ├── auth.js            # Register, login, logout, profile fetch handlers
            ├── music.js           # Music CRUD event handlers
            ├── admin.js           # Admin panel event handlers
            ├── state.js           # JWT token read/write via localStorage
            ├── ui.js              # updateSessionUI(), renderProfile(), printResult()
            └── dom.js             # Cached DOM element references
```

---

## API Reference

### Auth Routes — `/api/v1/auth`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/register` | None | Create a new user account |
| `POST` | `/login` | None | Login with username/email + password |
| `POST` | `/logout` | None | Clear auth cookie |
| `GET` | `/me` | User | Get current user profile |

### Music Routes — `/api/v1/music`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/` | User | Create a music entry (optional file upload) |
| `GET` | `/` | User | List the current user's music |
| `PUT` | `/:musicId` | User (owner) | Update own music title or file |
| `DELETE` | `/:musicId` | User (owner) | Delete own music entry |

### Admin Routes — `/api/v1/music/admin`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/admin/all` | Admin | List all music from all users |
| `PATCH` | `/admin/:musicId/confirm` | Admin | Approve a pending music entry |
| `DELETE` | `/admin/:musicId` | Admin | Delete any music entry |

---

## Setup & Run Locally

### Prerequisites
- Node.js >= 18
- MongoDB (local or Atlas)
- ImageKit account (optional — only needed for file uploads)

### 1. Clone the repo
```bash
git clone https://github.com/soumadip9/role-based-access-backend.git
cd role-based-access-backend
```

### 2. Install dependencies
```bash
cd backend
npm install
```

### 3. Create environment file
Create `backend/.env`:
```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/spotifydb
JWT_SECRET=your_long_random_secret_here
IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
PUBLIC_URL=http://localhost:3000
```

### 4. Start the server
```bash
npm run dev
```

### 5. Open in browser
- **Frontend UI:** `http://localhost:3000`
- **Swagger Docs:** `http://localhost:3000/api-docs`
- **API JSON spec:** `http://localhost:3000/api-docs.json`

---

## Authentication Flow

```
Client                          Server
  │                               │
  ├── POST /auth/register ──────► │ hash password (bcrypt, 10 rounds)
  │                               │ create user in MongoDB
  │ ◄── 201 { token, user } ──── │ sign JWT { id, role } exp 1d
  │                               │ set httpOnly cookie
  │                               │
  ├── POST /auth/login ─────────► │ lookup user by username or email
  │                               │ bcrypt.compare password
  │ ◄── 200 { token, user } ──── │ sign new JWT, set cookie
  │                               │
  ├── GET /auth/me ─────────────► │ authUser middleware:
  │   Authorization: Bearer <jwt> │   verify JWT → attach req.user
  │ ◄── 200 { user } ─────────── │ query DB, return profile
```

---

## Role-Based Access

| Action | `user` | `admin` |
|---|---|---|
| Register / Login | ✅ | ✅ |
| Create music | ✅ | ✅ |
| Read own music | ✅ | ✅ |
| Update / Delete own music | ✅ | ✅ |
| List ALL users' music | ❌ | ✅ |
| Approve (confirm) music | ❌ | ✅ |
| Delete any music | ❌ | ✅ |

To create an admin: set `role: "admin"` directly in MongoDB for a user document.

---


## API Documentation

- **Swagger UI:** `http://localhost:3000/api-docs` — interactive, try endpoints directly
- **Postman Collection:** `backend/docs/SpotifyBackend.postman_collection.json` — import into Postman

---

## Security Measures

- Passwords hashed with **bcrypt** (10 salt rounds) — never stored in plaintext
- JWTs signed with `JWT_SECRET` — verified on every protected request
- `httpOnly` cookie prevents XSS token theft
- Input sanitised with `.trim()` and `.normalizeEmail()` via express-validator
- MongoID params validated before DB queries to prevent injection
- Passwords stripped from all API responses via Mongoose `toJSON` transform
- `401` auto-clears client token on invalid/expired JWT

---

## Scalability Notes

| Concern | Approach |
|---|---|
| **Stateless API** | JWT-based auth — no server-side sessions, scales horizontally |
| **Module structure** | Separate controllers / routes / models / validators / services — add new features without touching existing code |
| **Horizontal scaling** | Deploy multiple instances behind a load balancer (e.g. NGINX, AWS ALB) |
| **Caching** | Add Redis for frequently read endpoints (e.g. music list) to reduce DB load |
| **File storage** | ImageKit CDN offloads binary storage from the API server |
| **Logging** | Add Morgan + Winston for structured request/error logging |
| **Containerisation** | Wrap in Docker + docker-compose for consistent deployment |
| **Rate limiting** | Add `express-rate-limit` to prevent brute-force on auth endpoints |
