# Second Brain App

## Overview
The Second Brain App is a robust backend application built with Node.js, Express, and TypeScript, designed to provide a seamless experience for handling user data securely. This application integrates MongoDB for data persistence and JWT-based authentication for secure access.

## Features
- **Node.js**: A JavaScript runtime that allows the development of scalable server-side applications.
- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **TypeScript**: A superset of JavaScript that adds static types, enhancing code quality and maintainability.
- **MongoDB**: A NoSQL database that stores data in flexible, JSON-like documents.
- **JWT Authentication**: JSON Web Tokens provide a secure method for user authentication.
- **Bcrypt Password Hashing**: Passwords are hashed for secure storage, ensuring user credentials are protected.
- **CORS Support**: Cross-Origin Resource Sharing is enabled to allow requests from different origins.
- **Environment Configuration**: Configuration settings are managed through environment variables for flexibility across different environments.

## Getting Started
### Prerequisites
- Node.js (v14.x or higher)
- MongoDB (local or cloud instance)
- TypeScript

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Arsalan-W84/Second-Brain-App.git
   cd Second-Brain-App
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory to store environment variables:
   ```plaintext
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/second-brain-app
   JWT_SECRET=your_jwt_secret
   ```

### Running the Application
1. Start the server:
   ```bash
   npm run dev
   ```
2. The application will run on `http://localhost:5000`.

## Usage
This application is designed to handle various API requests for managing user data. Ensure you utilize the provided endpoint routes as per your application requirements.

## API Endpoints

### 1) Auth Routes (`src/routes/authRoutes.ts`)
Base path is determined by where this router is mounted in the main server file.

- `POST /signup`
  - **Description:** Create a new user account.
  - **Body:**
    - `username` (string, 3–15 chars)
    - `password` (string, 6–15 chars)
  - **Success Response:** `200 OK`
    - `{ "message": "Signed Up Successfully!" }`
  - **Error Responses:**
    - `400 Bad Request` (validation errors)
    - `409 Conflict` (user already exists)

- `POST /login`
  - **Description:** Authenticate user credentials and return a JWT token.
  - **Body:**
    - `username` (string, 3–15 chars)
    - `password` (string, 6–15 chars)
  - **Success Response:** `200 OK`
    - `{ "token": "<jwt-token>" }`
  - **Error Responses:**
    - `400 Bad Request` (validation errors)
    - `401 Unauthorized` (incorrect username or password)
    - `501` (unexpected server errors from dependencies)

### 2) Content Routes (`src/routes/contentRoutes.ts`)
All routes below require authentication via `authmiddleware`.

- `POST /`
  - **Description:** Create a new content item for the authenticated user.
  - **Body:**
    - `link` (string)
    - `type` (string)
    - `title` (string)
  - **Success Response:** `200 OK`
    - `{ "message": "content post" }`
  - **Error Responses:**
    - `409 Conflict` (create failure)

- `GET /`
  - **Description:** Fetch all content items belonging to the authenticated user.
  - **Success Response:** `200 OK`
    - `{ "message": "content get", "contents": [...] }`

- `DELETE /`
  - **Description:** Delete a specific content item owned by the authenticated user.
  - **Body:**
    - `contentId` (string)
  - **Success Response:** `200 OK`
    - `{ "message": "Content deleted successfully" }`
  - **Error Responses:**
    - `401` (delete failure)

### 3) Brain/Share Routes (`src/routes/brainRoutes.ts`)

- `POST /share` (protected)
  - **Description:** Enable or disable sharing for the authenticated user.
  - **Body:**
    - `share` (boolean)
  - **Behavior:**
    - If `share` is `true`, generates (or updates) a share hash and returns it.
    - If `share` is `false`, disables sharing by deleting the link.
  - **Success Responses:**
    - `200 OK` with `{ "link": "<hash>" }` when enabling
    - `200 OK` with `{ "message": "Sharing disabled" }` when disabling
  - **Error Responses:**
    - `404` (operation failure)

- `GET /:shareLink`
  - **Description:** Fetch shared content using a share hash.
  - **Path Param:**
    - `shareLink` (string hash)
  - **Success Response:** `200 OK`
    - `{ "contents": [...] }`
  - **Error Responses:**
    - `500` (invalid/missing hash or other server errors)

## Notes
- Route prefixes (for example, `/api/v1/auth`, `/api/v1/content`, `/api/v1/brain`) depend on how routers are mounted in your main application setup.
- Protected endpoints require a valid JWT recognized by `authmiddleware`.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
