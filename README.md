# 🎵 SoundStream API

Backend for a music streaming platform built with Node.js, Express, and MongoDB.  
Supports authentication, album and track management with secure APIs.

---

## 🚀 Features
- JWT-based authentication (login/register)
- Password hashing using bcrypt  
- RESTful APIs for users, albums, and tracks  
- MongoDB integration with Mongoose  
- Modular architecture (controllers, routes, middleware)

---

## 🛠️ Tech Stack
Node.js, Express.js, MongoDB, Mongoose, JWT, bcrypt

---

## ⚙️ Setup
```bash
git clone https://github.com/soumadip9/soundstream-api.git
cd soundstream-api
npm install
````

Create `.env`:

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
```

Run:

```bash
npm start
```

---

## 🔗 API (Sample)

* POST `/api/auth/register`
* POST `/api/auth/login`
* GET `/api/music`
* POST `/api/music`

---

## 👨‍💻 Author

Soumadip Ghosh
[https://github.com/soumadip9](https://github.com/soumadip9)

