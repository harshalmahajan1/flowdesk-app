# FlowDesk — Full Stack Web Application

A modern CRM-style dashboard built with **React.js**, **Node.js**, **Express**, and **MongoDB**.

---

## 📁 Project Structure

```
app/
├── backend/                  # Node.js + Express + MongoDB API
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js # Login, Register, Profile
│   │   └── dashboardController.js # Dashboard data
│   ├── middleware/
│   │   └── auth.js           # JWT auth middleware
│   ├── models/
│   │   └── User.js           # Mongoose User model
│   ├── routes/
│   │   ├── auth.js           # /api/auth routes
│   │   └── dashboard.js      # /api/dashboard routes
│   ├── .env.example          # Environment variables template
│   ├── seed.js               # Seed demo users into MongoDB
│   └── server.js             # Express app entry point
│
└── frontend/                 # React.js application
    ├── public/
    │   └── index.html
    └── src/
        ├── context/
        │   └── AuthContext.js  # Global auth state (login/logout)
        ├── pages/
        │   ├── LoginPage.js    # Login form with validation
        │   └── DashboardPage.js# Dashboard with tabs (Leads/Tasks/Team)
        └── App.js              # Root component + routing
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16+
- MongoDB (local or [MongoDB Atlas](https://cloud.mongodb.com))
- npm or yarn

---

## 🔧 Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

Edit `.env`:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/fullstack_app
JWT_SECRET=your_super_secret_key_change_this
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

```bash
# Seed demo users into MongoDB
node seed.js

# Start the backend server
npm start
# or for development with auto-reload:
npm run dev
```

Server runs at: **http://localhost:5000**

### Demo Accounts (created by seed.js)

| Role    | Email               | Password      |
|---------|---------------------|---------------|
| Admin   | admin@demo.com      | password123   |
| Manager | manager@demo.com    | password123   |
| User    | user@demo.com       | password123   |

---

## 🎨 Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# (Optional) Set the API URL if backend is on a different host
# Create a .env file:
echo "REACT_APP_API_URL=http://localhost:5000/api" > .env

# Start the React app
npm start
```

App runs at: **http://localhost:3000**

> **Note:** If the backend is not running, the dashboard will automatically fall back to built-in static data so you can still preview the UI.

---

## 🌐 API Endpoints

### Auth Routes (`/api/auth`)

| Method | Endpoint              | Access  | Description              |
|--------|-----------------------|---------|--------------------------|
| POST   | `/api/auth/register`  | Public  | Register a new user      |
| POST   | `/api/auth/login`     | Public  | Login & receive JWT      |
| GET    | `/api/auth/me`        | Private | Get current user profile |

**Login Request Body:**
```json
{
  "email": "admin@demo.com",
  "password": "password123"
}
```

**Login Response:**
```json
{
  "success": true,
  "user": {
    "id": "...",
    "name": "Admin User",
    "email": "admin@demo.com",
    "role": "admin"
  },
  "token": "eyJhbGci..."
}
```

### Dashboard Routes (`/api/dashboard`)

| Method | Endpoint         | Access  | Description                        |
|--------|------------------|---------|------------------------------------|
| GET    | `/api/dashboard` | Private | Get leads, tasks, users, and stats |

---

## ✅ Features

### Login Page
- Email + password form with validation
- Valid email format check (regex)
- Empty field detection with inline error messages
- Show/hide password toggle
- Quick-fill demo account buttons
- JWT token stored in `localStorage`

### Dashboard Page
- Displays logged-in user's name and role
- **Stat cards**: Total Leads, Open Tasks, Active Users, Revenue
- **Tabbed data tables**:
  - 🎯 **Leads** — company, email, status, value, source, date
  - ✅ **Tasks** — title, assignee, priority, status, due date
  - 👥 **Team** — name, email, role, status, deals closed
- Color-coded status badges
- Sidebar navigation
- **Logout** button (clears token + redirects to login)

---

## 🚢 Deployment

### Frontend — Vercel

```bash
cd frontend
npm run build

# Install Vercel CLI
npm i -g vercel
vercel --prod
```

Set environment variable in Vercel dashboard:
```
REACT_APP_API_URL = https://your-backend.onrender.com/api
```

### Backend — Render (free tier)

1. Push backend folder to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repo
4. Set build command: `npm install`
5. Set start command: `node server.js`
6. Add environment variables:
   - `MONGODB_URI` → your Atlas connection string
   - `JWT_SECRET` → a secure random string
   - `FRONTEND_URL` → your Vercel URL

### MongoDB Atlas (cloud database)

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com)
2. Create a free cluster
3. Get connection string:
   ```
   mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/fullstack_app
   ```
4. Use this as your `MONGODB_URI`

---

## 🔐 Security Notes

- Passwords are hashed using **bcryptjs** (10 salt rounds)
- Auth uses **JWT** tokens with 7-day expiry
- Protected routes require `Authorization: Bearer <token>` header
- CORS is configured to only allow the frontend origin

---

## 🛠 Tech Stack

| Layer     | Technology              |
|-----------|-------------------------|
| Frontend  | React.js 18, Axios      |
| Backend   | Node.js, Express.js     |
| Database  | MongoDB, Mongoose       |
| Auth      | JWT, bcryptjs           |
| Deploy    | Vercel (FE), Render (BE)|
