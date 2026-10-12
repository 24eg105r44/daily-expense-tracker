# Daily Expense Tracker 💰📊

A modern, full-stack personal finance tracking application featuring a clean separation between the **React Frontend** and the **Node.js/Express Backend REST API**.

## 🚀 Live Demo & Deployment
- **Frontend Live URL**: [https://24eg105r44.github.io/daily-expense-tracker/](https://24eg105r44.github.io/daily-expense-tracker/)
- Automated CI/CD pipeline deploys the frontend to GitHub Pages on every push to `main`.

---

## 📁 Separated Architecture Overview

```text
daily-expense-tracker/
├── .github/
│   └── workflows/
│       └── deploy.yml            # CI/CD automated deployment workflow for frontend
│
├── frontend/                     # ⚛️ React 19 + Vite Frontend SPA
│   ├── public/                   # Static assets & icons
│   ├── src/
│   │   ├── assets/               # Media & graphics
│   │   ├── components/           # UI components (Charts, Modals, Navbar, etc.)
│   │   ├── data/                 # Sample seed data & default categories
│   │   ├── services/             # API client connecting to backend with offline fallback
│   │   ├── styles/               # Glassmorphism styling & themes
│   │   ├── App.jsx               # Main React Application
│   │   └── main.jsx              # Vite entry point
│   ├── index.html                # HTML entry
│   ├── package.json              # Frontend dependencies
│   └── vite.config.js            # Vite configuration
│
├── backend/                      # 🌐 Node.js + Express REST API Backend
│   ├── src/
│   │   ├── controllers/          # Business logic (expenses, categories, recurring, splits, stats)
│   │   ├── data/                 # Data store with persistent db.json sync
│   │   ├── routes/               # Modular Express API routes
│   │   └── server.js             # Express app entry point, CORS & middleware
│   ├── .env.example              # Environment variables template
│   ├── package.json              # Backend dependencies
│   └── README.md                 # Detailed REST API endpoints documentation
│
├── package.json                  # Root monorepo scripts for running frontend & backend
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm

### 1. Installation

Install dependencies for both frontend and backend from the root directory:
```bash
npm run install:all
```
*(Or install individually: `npm --prefix frontend install` and `npm --prefix backend install`)*

---

### 2. Running Locally

#### Option A: Run Frontend & Backend Independently
- **Start Backend API** (runs on `http://localhost:5000`):
  ```bash
  npm run dev:backend
  ```
- **Start Frontend App** (runs on `http://localhost:5173`):
  ```bash
  npm run dev:frontend
  ```

#### Option B: Standalone Frontend
You can run the frontend on its own without starting the backend:
```bash
npm run dev
```
The frontend automatically detects whether the backend is available. If the backend is active, it syncs transactions through the REST API; if offline, it functions seamlessly using local browser storage.

---

### 3. Production Build & Preview

```bash
# Build frontend bundle
npm run build

# Preview build locally
npm run preview
```

---

## 📡 Backend REST API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status & uptime |
| `GET` | `/api/expenses` | Get expenses (with search/filter query params) |
| `POST` | `/api/expenses` | Create a new expense |
| `PUT` | `/api/expenses/:id` | Update an existing expense |
| `DELETE`| `/api/expenses/:id` | Delete an expense |
| `GET` | `/api/categories` | Categories & monthly budget limits |
| `PUT` | `/api/categories/:id` | Update category limits |
| `GET` | `/api/recurring` | Recurring subscriptions & bills |
| `POST` | `/api/recurring` | Add recurring bill |
| `DELETE`| `/api/recurring/:id` | Delete recurring bill |
| `GET` | `/api/splits` | Group bill splits |
| `POST` | `/api/splits` | Create shared split group |
| `GET` | `/api/stats/summary` | Analytics & budget breakdown |
