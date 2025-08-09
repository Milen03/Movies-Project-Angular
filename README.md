# Movies-Project-Angular

Movies Project (Angular + Node.js)
📌 Description
Movies Project is a student assignment built with Angular for the frontend and Node.js + Express for the backend.
It allows users to browse movies, view details, create their own movies, edit or delete them if they are the owner, like other users’ movies, and manage their profile.

This project implements:

Public and private routes with authentication and authorization

CRUD operations for movies

REST API communication between frontend and backend

Client-side form validation

Responsive UI with basic styling

🚀 Features
Public Part:
Home Page – Introduction to the app

Movies Catalog – List of all movies

Movie Details – Info about a single movie

Register & Login – Authentication system

Private Part (only for logged-in users):
Create Movie – Add your own movie

Edit/Delete Movie – Only for the movie owner

Like Movies – Like any movie except your own

Profile Page – View and edit your profile

🛠 Technologies Used
Frontend:
Angular 17+

TypeScript

RxJS

Angular Forms

Angular Router

CSS / Basic Styling

Backend:
Node.js + Express

MongoDB + Mongoose

JWT Authentication

CORS & Cookie-based auth

📂 Project Structure
bash
Копиране
Редактиране
Movies-Project/
│
├── Movies-Project-Angular/   # Frontend (Angular)
│   ├── src/app/              # Components, services, routes
│   ├── package.json
│   └── ...
│
├── server/                   # Backend (Node.js + Express)
│   ├── controllers/          # API controllers
│   ├── models/               # Mongoose models
│   ├── routes/               # API routes
│   ├── utils/                 # Middleware (auth, error handling)
│   ├── server.js             # App entry point
│   └── package.json
│
└── README.md
⚙️ Installation & Run
1️⃣ Clone the repository
bash
Копиране
Редактиране
git clone https://github.com/Milen03/Movies-Project-Angular.git
cd Movies-Project-Angular
2️⃣ Run the Backend
bash
Копиране
Редактиране
cd server
npm install
npm start
The backend will run by default on http://localhost:3000.

3️⃣ Run the Frontend
bash
Копиране
Редактиране
cd Movies-Project-Angular
npm install
ng serve
The frontend will run by default on http://localhost:4200.

🔑 User Roles
Guest – Can browse movies, view details, register, login.

Logged User – Can create movies, edit/delete own movies, like others' movies, and edit profile.

📌 API Endpoints (Backend)
Auth

POST /api/users/register – Register

POST /api/users/login – Login

GET /api/users/profile – Get user profile

PUT /api/users/profile – Edit profile

Movies

GET /api/movie – Get all movies

GET /api/movie/:id – Get single movie

POST /api/movie – Create movie (auth required)

PUT /api/movie/:id – Edit movie (owner only)

DELETE /api/movie/:id – Delete movie (owner only)

PUT /api/movie/:id/like – Like movie