# RBAC Admin Panel

## Overview
A secure role-based admin panel built using React, Ant Design, and Node.js. Supports user management, role assignment, and real-time updates via Socket.IO.

## Architecture
- **Frontend:** React.js with Ant Design (AntD)
- **Backend:** Node.js with Express.js (Microservices)
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JWT + bcrypt
- **Real-time:** Socket.IOSocket.IO
- **Communication between services:** REST / HTTP

## Features
- Admin/User login and registration
- Role-based access control (RBAC)
- Assign/Remove Admin role
- Add, Edit, Delete users
- Search users in the table

## Setup Steps

1. **Clone the repo**
```bash
git clone https://github.com/lakshminarayanan05/rbac-admin-panel.git
cd rbac-admin-panel
```
2. **Install dependencies**
```
# Frontend
cd client
npm install

# Backend
cd ../server
npm install
```
3. **Environment Variables**

- Create a .env file using env.example as reference.
- Example:
```
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=admin_panel
JWT_SECRET=your_secret_key
```
4. **Run the project**
```
# Backend
cd server
npm start

# Frontend
cd ../client
npm run dev
```
5. **Access**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000

## Notes
- Ensure the backend is running before using the frontend.
- Socket.IO requires both frontend and backend to be active.
