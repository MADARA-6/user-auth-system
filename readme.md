User Authentication System with JWT, OAuth, and Role-Based Access Control
This is a secure user authentication system built with Node.js, Express.js, MongoDB, and Passport.js. It supports:
✅ JWT-based authentication
✅ Google & GitHub OAuth login
✅ Role-Based Access Control (RBAC)
✅ Refresh tokens for session management

📌 Features
User Registration & Login with JWT
Google & GitHub OAuth Authentication
Role-Based Access Control (RBAC) (Admin & User roles)
Access & Refresh Token System
Secure Password Hashing with bcrypt
Protected Routes (Only accessible with valid tokens)
🚀 Tech Stack
Backend: Node.js, Express.js
Database: MongoDB, Mongoose
Authentication: Passport.js, JWT, bcrypt.js
Security: dotenv, helmet, cors
📂 Project Structure
user-auth-system/
│── backend/
│   ├── models/
│   │   ├── User.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── userRoutes.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   ├── controllers/
│   │   ├── authController.js
│   ├── config/
│   │   ├── db.js
│   │   ├── passport.js
│   ├── server.js
│── .env
│── package.json
│── README.md

 Run the Server

npm install
npm start
nodemon server.js  # For development mode

🛠 API Endpoints
1️⃣ Authentication Routes (/auth/)
🔹 User Registration
http
POST /auth/register
Body:

json
{
  "name": "John Doe",
  "email": "johndoe@example.com",
  "password": "password123"
}
🔹 User Login
http
POST /auth/login
Body:

json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
Response:

json
Copy code
{
  "accessToken": "your_access_token",
  "refreshToken": "your_refresh_token"
}
🔹 Google OAuth
http
GET /auth/google
Redirects to Google login page
After login, Google redirects to:

http
/auth/google/callback
🔹 GitHub OAuth
http
GET /auth/github
Redirects to GitHub login page
After login, GitHub redirects to:

http
/auth/github/callback
2️⃣ User Routes (/user/)
🔹 Get User Profile (Protected)
http
GET /user/profile
Headers: { Authorization: "Bearer <token>" }
Response:

json
{
  "message": "Access granted",
  "user": {
    "id": "64b6f7d4a8f6a2e3b1d0c7e8",
    "name": "John Doe",
    "email": "johndoe@example.com"
  }
}
🔹 Admin-Only Route (Delete a User)
http
Copy code
DELETE /admin/delete-user
Headers: { Authorization: "Bearer <admin_token>" }
Response (Admin only):

json
{ "message": "Admin action successful" }
Response (Regular User):

json
{ "message": "Access Denied: Insufficient permissions" }

🔐 Role-Based Access Control (RBAC)
Role	Access
User	Can register, log in, access profile
Admin	Can delete users