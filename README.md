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

## Demo
<img width="1920" height="1080" alt="Screenshot 2025-12-15 003016" src="https://github.com/user-attachments/assets/d3505b1f-1b40-4426-979b-f646d6c7b1f0" />
<img width="1920" height="1080" alt="Screenshot 2025-12-15 003116" src="https://github.com/user-attachments/assets/63086d9a-750d-4591-96bf-51ffc308cc62" />
<img width="1920" height="1080" alt="Screenshot 2025-12-15 003150" src="https://github.com/user-attachments/assets/59f3ae2f-f14d-40a7-afae-4be622f545f3" />
<img width="1920" height="1080" alt="Screenshot 2025-12-15 003241" src="https://github.com/user-attachments/assets/bbdbe21e-0d0c-4e67-9145-9a230db7a4f2" />

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
