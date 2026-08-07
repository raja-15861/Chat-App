# 💬 Chat App

A full-stack real-time chat application built with the **MERN stack** (MongoDB, Express, React, Node.js). It features JWT-based authentication, cloud-hosted image uploads, and a modern, responsive UI powered by Tailwind CSS and DaisyUI.

---

## ✨ Features

- 🔐 **User Authentication** — Sign up, log in, log out, and session persistence using JWT stored in an httpOnly cookie.
- 👤 **Profile Management** — Update your profile picture (uploaded to Cloudinary).
- 💬 **Messaging** — Send and receive text messages and images between users.
- 🧑‍🤝‍🧑 **User List Sidebar** — View all other registered users to start a conversation.
- 🛡️ **Protected Routes** — Private pages are protected from unauthenticated access.
- 🖼️ **Cloudinary Integration** — Profile pictures and message images are stored in the cloud.
- 🎨 **Modern UI** — Built with React, Tailwind CSS, DaisyUI, and lucide-react icons.
- 🔔 **Toast Notifications** — Real-time user feedback via `react-hot-toast`.

---

## 🛠️ Tech Stack

### Backend
- **Node.js** & **Express** — REST API server
- **MongoDB** & **Mongoose** — Database and ODM
- **JWT** — Authentication (expires in 7 days)
- **bcrypt** — Password hashing
- **Cloudinary** — Image storage and management
- **Cookie-parser** & **CORS** — Cookie handling and cross-origin requests
- **Socket.io** — Included for future real-time messaging

### Frontend
- **React 19** & **Vite** — UI framework and build tool
- **Redux Toolkit** — State management
- **React Router** — Client-side routing
- **Axios** — HTTP requests
- **Tailwind CSS** & **DaisyUI** — Styling
- **react-hot-toast** — Notifications
- **lucide-react** — Icons

---

## 📁 Project Structure

```
Chat-App/
├── backend/                 # Express API server
│   ├── config/
│   │   └── db.js            # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js    # Signup, login, logout, profile
│   │   └── messageController.js # Messages & user list
│   ├── lib/
│   │   ├── cloudinary.js     # Cloudinary config
│   │   └── utils.js          # JWT token generation
│   ├── middleware/
│   │   └── Auth.js           # JWT authentication middleware
│   ├── models/
│   │   ├── messageModel.js   # Message schema
│   │   └── userModel.js      # User schema
│   ├── routes/
│   │   ├── authRoute.js      # /auth/api
│   │   └── messageRoute.js   # /message/api
│   ├── index.js              # Server entry point
│   └── package.json
│
└── frontend/                # React app
    ├── public/
    ├── routes/
    │   └── protectedRoute.jsx  # Route guard
    ├── src/
    │   ├── components/
    │   │   └── Navbar.jsx
    │   ├── lib/
    │   │   └── axios.js        # Axios instance & connector
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── Profile.jsx
    │   │   ├── SettingsPage.jsx
    │   │   └── SignupPage.jsx
    │   ├── reducers/
    │   │   └── index.js        # Root reducer
    │   ├── services/
    │   │   ├── api.js          # API endpoint constants
    │   │   └── Operations/
    │   │       └── auth.js     # Auth & profile operations
    │   ├── slices/
    │   │   ├── authSlices.js   # Auth state
    │   │   └── profileSlice.js # User state
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    └── package.json
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Cloudinary](https://cloudinary.com/) account (for image uploads)

### 1. Clone the repository
```bash
git clone https://github.com/your-username/chat-app.git
cd chat-app
```

### 2. Backend setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=3000
MONGO_URL=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
```

Start the backend server:
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

### 3. Frontend setup
In a new terminal:
```bash
cd frontend
npm install
npm run dev
```

The frontend will run at [http://localhost:5173](http://localhost:5173) and the backend at [http://localhost:3000](http://localhost:3000).

---

## 🌐 API Endpoints

### Authentication (`/auth/api`)
| Method | Endpoint           | Description                       | Auth |
|--------|--------------------|-----------------------------------|------|
| POST   | `/auth/api/signup` | Register a new user               | No   |
| POST   | `/auth/api/login`  | Log in an existing user           | No   |
| POST   | `/auth/api/logout` | Log out and clear the cookie      | No   |
| PUT    | `/auth/api/update-profile` | Update the user's profile picture | Yes |
| GET    | `/auth/api/check`  | Validate the current session      | Yes |

### Messages (`/message/api`)
| Method | Endpoint                | Description                          | Auth |
|--------|-------------------------|--------------------------------------|------|
| GET    | `/message/api/users`    | Get all users for the sidebar        | Yes  |
| GET    | `/message/api/:id`      | Get conversation with a specific user | Yes  |
| POST   | `/message/api/send/:id` | Send a message to a specific user    | Yes  |

---

## 🗂️ Data Models

### User
| Field       | Type     | Constraints      |
|-------------|----------|------------------|
| fullName    | String   | required, trim   |
| email       | String   | required, unique |
| password    | String   | required, min 6  |
| profilePic  | String   | default: `""`    |

> Timestamps are enabled.

### Message
| Field      | Type     | Constraints              |
|------------|----------|--------------------------|
| senderId   | ObjectId | ref: User, required      |
| receiverId | ObjectId | ref: User, required      |
| text       | String   | optional                 |
| image      | String   | optional (Cloudinary URL)|

> Timestamps are enabled.

---

## 🧠 How It Works

1. **Authentication** — Users register or log in. The backend hashes passwords with bcrypt and issues a JWT stored in an httpOnly cookie (7-day expiry) for secure, XSS-resistant session management.
2. **Profile** — Users can upload a profile picture, which is uploaded to Cloudinary and the returned secure URL is saved to their profile.
3. **Messaging** — Users can view a list of all other users, open a conversation, and send text and/or image messages. Images are uploaded to Cloudinary and stored as URLs.
4. **Protected Routes** — The frontend guards private pages (Home, Profile) and redirects unauthenticated users to the signup page.

---

## 🔮 Roadmap / Upcoming Features

- ⚡ **Real-time messaging** with Socket.io (dependency already installed)
- 📱 **Responsive chat UI** and message read receipts
- 🟢 **Online/offline presence** indicators
- 🔍 **Search users** and message search
- 🧪 **Unit & integration tests**

---

## 📄 License

This project is for educational/demo purposes. You are free to use and modify it.

---

*Happy chatting! 💬*
