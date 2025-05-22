🖥️ Software Access Management System
A full-stack web application built for managing software access requests within an organization. It allows admin users to create software entries with different access levels, and regular users to request access based on their role.

🚀 Tech Stack Used
Frontend (React + Bootstrap)

React Router v6

Axios for API calls

Bootstrap for responsive design

LocalStorage for token and role handling

Protected routes based on user role

Backend (Node.js + Express + MongoDB)

Express.js REST API

MongoDB with Mongoose ODM

JWT-based authentication

Role-based access control (Admin/User)

Secure routes using middlewares

🔐 Features
Authentication System

Login and registration with JWT token-based authentication

Role-based redirection (Admin / User)

Admin Functionalities

Create new software entries

Define multiple access levels (e.g., Read, Write, Admin)

View and manage all access requests

User Functionalities

View list of available software

Submit software access requests

Track request submission status (optional to add later)

Protected Routes

Ensures only logged-in users can access certain pages

Admin-only routes are protected via ProtectedRoute component

📁 Folder Structure (Basic)
pgsql
Copy
Edit
├── client (React Frontend)
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── api.js
│
├── server (Node.js Backend)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   └── server.js
