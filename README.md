# Second Brain App

## Overview
The Second Brain App is a robust backend application built with Node.js, Express, and TypeScript, designed to provide a seamless experience for handling user data securely. This application integrates MongoDB for data storage and employs JWT for authentication, ensuring a secure and efficient environment.

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
- `POST /api/auth/register`: Register a new user
- `POST /api/auth/login`: Authenticate a user and return a JWT
- `GET /api/users`: Get all users (protected route)
- `GET /api/users/:id`: Get a user by ID (protected route)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.