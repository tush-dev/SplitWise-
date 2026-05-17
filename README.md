# 💸 SplitWise — Smart Expense Management Platform

<div align="center">

### Simplify shared expenses, settlements, and spending insights with a modern full-stack web application.

**Built with the MERN stack for seamless group expense tracking, balance settlements, and analytics.**

[🚀 Live Demo](https://split-wise-chi-five.vercel.app/) • [💻 Repository](https://github.com/tush-dev/SplitWise-)

</div>

---

## ✨ Overview

SplitWise is a full-stack expense management platform designed to make group spending simple, transparent, and stress-free.

Whether you're splitting bills with friends, managing shared expenses with roommates, or tracking collaborative spending, SplitWise helps users stay financially organized with real-time balance tracking and spending analytics.

The platform focuses on:

🔹 Expense tracking  
🔹 Group settlements  
🔹 Balance management  
🔹 Spending analytics  
🔹 Secure authentication  
🔹 Responsive user experience  

---

# 🚀 Key Features

### 👥 Group Expense Management

🔹 Create and manage expense groups  
🔹 Add shared expenses among multiple participants  
🔹 Track individual contributions  
🔹 Simplify settlements between members  

---

### 💰 Smart Balance Tracking

🔹 Real-time balance calculations  
🔹 Clear debtor / creditor visibility  
🔹 Settlement tracking for simplified payments  
🔹 Personalized expense summaries  

---

### 📊 Expense Analytics

Gain insights into spending habits with visual analytics:

🔹 Monthly spending trends  
🔹 Category-wise expense breakdown  
🔹 Interactive financial charts  
🔹 Better budgeting visibility  

---

### 🔐 Authentication & Security

🔹 Secure JWT-based authentication  
🔹 Protected routes  
🔹 Password encryption with bcrypt  
🔹 User session management  

---

# 🏗 Architecture

## System Flow

```text
User Interaction
      ↓
React Frontend
      ↓
Redux State Management
      ↓
REST API Requests (Axios)
      ↓
Express Backend
      ↓
Authentication Middleware (JWT)
      ↓
Business Logic Layer
      ↓
MongoDB Database
      ↓
Analytics + Balance Calculations
      ↓
Updated Dashboard UI
```

---

# 🛠 Tech Stack

## Frontend

🧩 React.js  
🧩 Redux  
🧩 Axios  
🧩 Material UI  
🧩 Chart.js  
🧩 React-Chartjs-2  
🧩 Gravatar  

---

## Backend

🛠 Node.js  
🛠 Express.js  
🛠 JWT Authentication  
🛠 bcrypt.js  
🛠 Mongoose  

---

## Database

🗄 MongoDB Atlas

---

# 📁 Project Structure

```text
client/
 ┣ src/
 ┃ ┣ components/      → reusable UI components
 ┃ ┣ pages/           → application screens
 ┃ ┣ redux/           → centralized state management
 ┃ ┣ utils/           → helper utilities
 ┃ ┗ assets/          → static resources

server/
 ┣ routes/            → API route definitions
 ┣ controllers/       → request handling logic
 ┣ middleware/        → auth + validation middleware
 ┣ models/            → database schemas
 ┗ config/            → environment + DB configuration
```

---

# ⚙️ Local Setup

## Clone Repository

```bash
git clone https://github.com/tush-dev/SplitWise-.git
cd SplitWise-
```

---

## Frontend Setup

```bash
cd client
npm install
npm start
```

---

## Backend Setup

Create a `.env` file in the server/root directory:

```env
PORT=3001
MONGODB_URI=your_mongodb_connection_string
ACCESS_TOKEN_SECRET=your_secret_key
```

Install dependencies and start backend:

```bash
npm install
npm start
```

---

# 🌟 Why This Project Matters

This project demonstrates practical full-stack engineering concepts:

◆ Real-world MERN architecture  
◆ Authentication & authorization  
◆ REST API design  
◆ Database schema modeling  
◆ Financial calculation logic  
◆ State management with Redux  
◆ Interactive analytics dashboards  
◆ Responsive frontend engineering  

---

# 🎯 Future Improvements

Planned enhancements:

🔹 Expense reminders  
🔹 Payment gateway integration  
🔹 Real-time notifications  
🔹 Multi-currency support  
🔹 Advanced budgeting insights  
🔹 Dark mode support  

---

# 👨‍💻 Author

**Tushar Panwar**

B.Tech @ NIT Jalandhar  
Full-Stack Developer | AI Engineering Enthusiast

---

<div align="center">

### ⭐ If you found this project useful, consider starring the repository.

</div>

---

# 📜 License

This project is licensed under the MIT License.
