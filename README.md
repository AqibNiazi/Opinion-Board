# 🗳️ Opinion Board

A full-stack opinion sharing platform where users can submit their opinions and vote (upvote/downvote) on others. The application consists of:

- 🔧 A **React 19** frontend (with `Context API`, `useEffect`, and new form features like `formAction`)
- 🔌 A **Node.js backend** for storing and managing opinions (dummy backend using `db.json`)

---

## 🚀 Features

- ✍️ Submit your opinion via a simple form
- 📜 View all submitted opinions instantly
- 👍 Upvote or 👎 downvote any opinion
- 💾 Dummy backend with file-based persistence (for now)
- 🌐 Deployed using **Vercel**

---

## 📁 Project Structure

```

Opinion-Board/
│
├── frontend/       # React 19 application
│   ├── src/
│   ├── public/
│   └── vite.config.js
│
├── backend/        # Node.js backend using Express-style logic
│   ├── api/        # Vercel serverless function: opinions.js
│   └── db.json     # Simulated database
│
├── README.md
└── ...

````

---

## 🌐 Live Demo

- **Frontend**: [https://opinion-board-gilt.vercel.app](https://opinion-board-gilt.vercel.app)
- **Backend (API)**: [Deployed via Vercel serverless functions]

---

## 🧑‍💻 Technologies Used

### 🖥️ Frontend (React 19 + Vite)
- React 19 new features: `formAction`, `useFormStatus`, etc.
- Context API for global state management
- `useEffect` and hooks-based architecture
- Vite for fast dev & build

### ⚙️ Backend (Node.js)
- `fs.promises` to simulate persistence with a JSON file
- RESTful API routes: `GET`, `POST`, `upvote`, `downvote`
- CORS headers for frontend-backend communication
- Hosted via Vercel's serverless function support

---

## 🛠️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/AqibNiazi/Opinion-Board.git
cd Opinion-Board
````

---

### 2. Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:5173`

> ⚠️ Make sure your backend API URL is correctly set via `.env` file or Vercel env vars:

```env
VITE_API_URL=https://your-backend-url.vercel.app
```

---

### 3. Run Backend Locally (optional)

```bash
cd backend
npm install
node api/opinions.js
```

API available at `http://localhost:3000/opinions`

> Note: Backend is designed to be deployed as a **Vercel serverless function**, and local runs may need adjustment if not using Vercel dev tools.

---

## 📦 Deployment

Both frontend and backend are deployed via **Vercel**.

### Environment Variable for Frontend

In Vercel → Project Settings → Environment Variables:

```
VITE_API_URL=https://your-backend.vercel.app
```

---

## 📌 Notes

* Backend currently uses `db.json` and does **not persist data on Vercel** due to serverless limitations.
* Consider switching to MongoDB Atlas, Supabase, or Vercel KV for persistent storage in production.

---

## 📬 Contributions

Feel free to fork the repo, submit issues, or open pull requests. Feedback and improvements are always welcome!

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
