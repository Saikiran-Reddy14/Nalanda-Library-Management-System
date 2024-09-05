# Nalanda Library Management System

This is a backend system for a library management platform built using Node.js, Express, and MongoDB. The system includes user management, book management, borrowing/returning books, and generating reports such as the most borrowed books and active members.

## Features

- **User Authentication**: JWT-based authentication with roles (Admin, Member)
- **Book Management**: CRUD operations for books (only accessible by Admins)
- **Borrowing System**: Members can borrow and return books
- **Reports**: Admins can view statistics such as the most borrowed books and active members

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (Ensure MongoDB is running on your machine or accessible remotely)

### Environment Variables
Create a `.env` file in the root of the project and add the following environment variables:
MONGO_URI: Your MongoDB connection URI.
JWT_SECRET: A secret string used for generating JSON Web Tokens (JWTs).
PORT=8000


### Installation

**Clone the repository:**
git clone https://github.com/yourusername/nalanda-library-management-system.git
cd nalanda-library-management-system

Install dependencies:
npm install

### Running the Application
Make sure MongoDB is running.
Start the server:
node server.js
The server will start on the port specified in the .env file (default: 8000).


### API Endpoints

**Authentication**
**POST /users/register:** Register a new user
**POST /users/login:** Login and get an authentication token

**Books**
**GET /books/:** Get all books (accessible to all users)
**POST /books/:** Create a new book (Admin only)
**PUT /books/:** Update book information (Admin only)
**DELETE /books/:** Delete a book (Admin only)

**Borrowing**
**POST /borrow/:** Borrow a book (Member only)
**POST /borrow/return/:** Return a borrowed book (Member only)
**GET /borrow/history:** Get the borrowing history of the current user (Member only)

**Reports**
**GET /stats/most-borrowed:** Get the most borrowed books (Admin only)
**GET /stats/active-members:** Get the most active members (Admin only)
**GET /stats/book-availability:** Get the total number of books and available copies (Admin only)


### Middleware
auth: JWT-based authentication middleware, protects routes for authenticated users. Only users with the appropriate roles can access certain routes.
Notes

### Cookies: The system uses HttpOnly cookies to store the JWT token securely.
Role-Based Access: Admins can manage books and view reports, while Members can borrow and return books.
