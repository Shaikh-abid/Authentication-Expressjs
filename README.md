# Authentication and Authorization Backend System

This project is a backend system for handling user authentication and authorization. It is built using **Node.js**, **Express.js**, **MongoDB**, and **bcrypt.js** for password hashing. The system includes routes for users to sign up, sign in, and allows administrators to access, view, and delete users through protected routes.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Available Routes](#available-routes)
  - [User Routes](#user-routes)
  - [Admin Routes](#admin-routes)
- [Middleware](#middleware)
- [Running the Application](#running-the-application)
- [License](#license)

## Features

- **User Signup**: Users can create an account with their email and password.
- **User Login**: Users can log in with their email and password.
- **Password Hashing**: Passwords are hashed using `bcrypt` before being saved in the database.
- **Admin Privileges**: Admin users can log in and perform administrative actions (view users, delete users).
- **Protected Routes**: Admin routes are protected, ensuring that only authorized admins can access them.
- **Role-based Access**: Only admins can access certain actions like viewing all users or deleting users by ID.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for building RESTful APIs.
- **MongoDB**: NoSQL database to store user data.
- **bcrypt.js**: For password hashing and validation.
- **dotenv**: To manage environment variables.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo/auth-backend.git
2. cd auth-backend
3. npm install
4. PORT=4000
  MONGO_URI=your_mongodb_connection_string
5. npm start
