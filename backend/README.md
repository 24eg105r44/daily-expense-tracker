# Expense Tracker Backend API 🛠️

A fast, lightweight Node.js and Express REST API service for Daily Expense Tracker.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Configuration
Copy `.env.example` to `.env` (optional, defaults to PORT 5000):
```bash
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
```

### 3. Run the Server
```bash
# Production mode
npm start

# Development mode (with live watch)
npm run dev
```

The API will be accessible at `http://localhost:5000`.

---

## 📡 API Endpoints

### 🩺 System & Health
- `GET /api/health` - Health check & server uptime
- `GET /api/payment-methods` - Available payment methods
- `POST /api/reset` - Reset data back to initial seed data

### 💳 Expenses (`/api/expenses`)
- `GET /api/expenses` - Get list of expenses (supports query params: `search`, `categoryId`, `startDate`, `endDate`, `limit`)
- `GET /api/expenses/:id` - Get single expense by ID
- `POST /api/expenses` - Create a new expense
  ```json
  {
    "description": "Lunch at Subway",
    "merchant": "Subway",
    "amount": 12.50,
    "categoryId": "cat-1",
    "paymentMethod": "upi",
    "date": "2026-10-12T13:00:00.000Z",
    "notes": "With colleagues"
  }
  ```
- `PUT /api/expenses/:id` - Update existing expense
- `DELETE /api/expenses/:id` - Delete an expense

### 📂 Categories & Budgets (`/api/categories`)
- `GET /api/categories` - Get all expense categories with monthly budget limits
- `PUT /api/categories/:id` - Update a category (e.g. limit or color)

### 🔁 Recurring Expenses (`/api/recurring`)
- `GET /api/recurring` - Get recurring subscriptions & recurring bills
- `POST /api/recurring` - Add a new recurring expense
- `PUT /api/recurring/:id` - Update recurring expense
- `DELETE /api/recurring/:id` - Delete recurring expense

### 👥 Shared Bill Splits (`/api/splits`)
- `GET /api/splits` - Get shared split groups
- `POST /api/splits` - Add a new split group
- `PUT /api/splits/:id` - Update a split group
- `DELETE /api/splits/:id` - Delete a split group

### 📊 Analytics & Stats (`/api/stats`)
- `GET /api/stats/summary` - Aggregated total spending, 7-day spending trends, and budget health
