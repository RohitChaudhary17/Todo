MERN Stack Todo App
A MERN Stack application that allows users to authenticate, create main todos, create multiple subtodos, and update their todos and subtodos. The app follows a simple user authentication system and offers the ability to manage tasks with hierarchical structure (Main Todos and Subtasks).

Features
User Authentication: Users can register and log in to the app.
Main Todo Creation: Users can create main todos (primary tasks).
Subtasks: Users can add multiple subtasks under a main todo.
Update Todo/Subtodo: Users can update both main todos and subtasks.
CRUD Operations: Full CRUD functionality for todos and subtasks.
Tech Stack
Frontend:

React.js (Frontend UI)
Axios (For API requests)
React Router (For navigation)
Backend:

Node.js
Express.js (Backend Framework)
MongoDB (Database)
Mongoose (MongoDB ODM)
Authentication:

JWT (JSON Web Token) for secure authentication
Project Structure
bash
Copy code
/my-todo-app
  ├── /backend            # Backend API (Node.js/Express)
  │   ├── /models         # Mongoose models (User, Todo, SubTodo)
  │   ├── /routes         # API Routes
  │   ├── /controllers    # Controller logic for API routes
  │   ├── server.js       # Entry point for the backend
  │   └── /middleware     # JWT authentication middleware
  ├── /frontend           # Frontend React application
  │   ├── /src            # React source files
  │   ├── /components     # React components (Todo, SubTodo, Auth forms)
  │   ├── /services       # Axios service for API calls
  │   └── App.js          # Main React component
  ├── .env                # Environment variables for backend (DB URI, JWT secret)
  ├── .gitignore          # Git ignore file
  ├── package.json        # Backend and frontend dependencies
  └── README.md           # Project readme (this file)
Setup & Installation
Prerequisites
Node.js and npm must be installed.
MongoDB must be installed locally or use a service like MongoDB Atlas.
Backend Setup
Navigate to the backend folder:

bash
Copy code
cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file in the backend folder and add the following environment variables:

makefile
Copy code
MONGO_URI=<Your MongoDB URI>
JWT_SECRET=<Your JWT Secret>
PORT=5000
Run the backend server:

bash
Copy code
npm start
The backend server should now be running on http://localhost:5000.

Frontend Setup
Navigate to the frontend folder:

bash
Copy code
cd frontend
Install dependencies:

bash
Copy code
npm install
Start the frontend development server:

bash
Copy code
npm start
The frontend application should now be running on http://localhost:3000.

API Endpoints
POST /api/auth/register: Register a new user.

Request body: { "username": "your-username", "password": "your-password" }
POST /api/auth/login: Login and get a JWT token.

Request body: { "username": "your-username", "password": "your-password" }
GET /api/todos: Get all todos for the authenticated user.

Requires Authorization: Bearer <JWT> header.
POST /api/todos: Create a new main todo.

Request body: { "title": "Main Todo Title", "description": "Main Todo Description" }
Requires Authorization: Bearer <JWT> header.
GET /api/todos/
: Get a specific main todo by ID.

Requires Authorization: Bearer <JWT> header.
PUT /api/todos/
: Update a main todo.

Request body: { "title": "Updated Title", "description": "Updated Description" }
Requires Authorization: Bearer <JWT> header.
DELETE /api/todos/
: Delete a main todo.

Requires Authorization: Bearer <JWT> header.
POST /api/todos/
/subtodos: Add a subtask to a main todo.

Request body: { "title": "Subtask Title", "completed": false }
Requires Authorization: Bearer <JWT> header.
PUT /api/subtodos/
: Update a subtask.

Request body: { "title": "Updated Subtask Title", "completed": true }
Requires Authorization: Bearer <JWT> header.
DELETE /api/subtodos/
: Delete a subtask.

Requires Authorization: Bearer <JWT> header.
Authentication & JWT
User Registration: Users need to register first by sending a POST request to /api/auth/register with a username and password. A hashed password is stored in MongoDB.

User Login: After registration, users can log in by sending a POST request to /api/auth/login. Upon successful login, a JWT token will be returned. This token is used for authenticating API requests.

JWT Middleware: A middleware checks if the request contains a valid JWT token. If valid, the user data is attached to the request.

Authorization: Every endpoint that requires authentication checks for the Authorization header with a Bearer token.

Frontend Details
Main Todos Page: Displays all the todos for the authenticated user. Users can create, update, and delete main todos.
Subtasks: For each main todo, users can add multiple subtasks. Each subtask can be marked as complete and updated individually.
Authentication: Includes login and registration forms for user authentication. A JWT token is stored in localStorage and used for API requests.
Example Usage
Register a new user:
bash
Copy code
POST /api/auth/register
{
  "username": "john_doe",
  "password": "securepassword"
}
Login:
bash
Copy code
POST /api/auth/login
{
  "username": "john_doe",
  "password": "securepassword"
}
Response:

json
Copy code
{
  "token": "your-jwt-token"
}
Create a new Todo:
bash
Copy code
POST /api/todos
Authorization: Bearer <your-jwt-token>
{
  "title": "Finish MERN project",
  "description": "Complete the MERN stack Todo app"
}
Add a Subtask:
bash
Copy code
POST /api/todos/<todoId>/subtodos
Authorization: Bearer <your-jwt-token>
{
  "title": "Create backend API",
  "completed": false
}
Update a Todo/Subtodo:
bash
Copy code
PUT /api/todos/<todoId>
Authorization: Bearer <your-jwt-token>
{
  "title": "Finish MERN stack app",
  "description": "Ensure that both frontend and backend are working"
}
License
This project is licensed under the MIT License - see the LICENSE file for details.
