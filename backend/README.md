# Simple Music API (Backend) + Static Frontend

This project is split into two folders:

- `backend/`: Express + MongoDB API
- `frontend/`: Static HTML/CSS/JS UI served by the backend

## Run

From `backend/`:

```bash
npm install
npm run dev
```

Open:

- `http://localhost:3000` (frontend UI)
- API base: `http://localhost:3000/api/v1`

## Environment Variables

Create `backend/.env`:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret
IMAGEKIT_PRIVATE_KEY=...
IMAGEKIT_PUBLIC_KEY=...
```

## Main Features

- Register/login/logout/me
- JWT auth via Bearer header or cookie
- User music CRUD (own records)
- Admin actions: list all, confirm, delete
- Optional file upload to ImageKit on create/update
- Request validation with express-validator
- Swagger API docs at `/api-docs`

## Routes

### Auth

- `POST /api/v1/auth/register`
- `POST /api/v1/auth/login`
- `POST /api/v1/auth/logout`
- `GET /api/v1/auth/me`

### Music (User)

- `POST /api/v1/music`
- `GET /api/v1/music`
- `PUT /api/v1/music/:musicId`
- `DELETE /api/v1/music/:musicId`

### Music (Admin)

- `GET /api/v1/music/admin/all`
- `PATCH /api/v1/music/admin/:musicId/confirm`
- `DELETE /api/v1/music/admin/:musicId`

## API Documentation

- Swagger UI: `http://localhost:3000/api-docs`
- OpenAPI JSON: `http://localhost:3000/api-docs.json`
- Postman collection: `backend/docs/SpotifyBackend.postman_collection.json`

## Scalability Note

- Module-first structure: controllers, routes, models, middlewares, validators, services.
- Easy horizontal scaling: API is stateless with JWT; add load balancer and multiple API instances.
- Caching option: add Redis for frequently requested reads such as music lists.
- Production readiness path: add centralized logging, rate limiting, and Docker image for deployment.
