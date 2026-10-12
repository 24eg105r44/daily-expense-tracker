# Daily Expense Tracker 💰📊

A modern, high-performance personal finance tracking web application built with React, Vite, Chart.js, and Lucide Icons.

## 🚀 Live Demo & Deployment
- **Live URL**: [https://24eg105r44.github.io/daily-expense-tracker/](https://24eg105r44.github.io/daily-expense-tracker/)
- Automated CI/CD pipeline deploys changes to GitHub Pages on every push to `main`.

---

## 📁 Project Structure

```text
daily-expense-tracker/
├── .github/
│   └── workflows/
│       └── deploy.yml        # GitHub Actions workflow for automated Pages deployment
├── frontend/                 # React frontend application
│   ├── public/               # Static assets & icons
│   ├── src/                  # React components, state, hooks & styles
│   │   ├── assets/           # Media & graphics
│   │   ├── components/       # UI Components (Charts, Modals, Navbar, etc.)
│   │   ├── data/             # Initial sample datasets
│   │   ├── styles/           # Global styles and design system
│   │   ├── App.jsx           # Main Application component
│   │   └── main.jsx          # Vite React entry point
│   ├── index.html            # Single Page App HTML template
│   ├── package.json          # Frontend dependencies & scripts
│   └── vite.config.js        # Vite bundler configuration
├── package.json              # Root package configuration with proxy scripts
└── README.md
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

From the repository root:
```bash
# Install frontend dependencies
npm --prefix frontend install
```

### Running Locally

```bash
# Start development server from root
npm run dev

# Or directly inside the frontend folder
cd frontend
npm run dev
```

### Building for Production

```bash
# Build production bundle from root
npm run build

# Preview production build locally
npm run preview
```

---

## 🌐 Deployment to GitHub Pages

The repository is configured to build and deploy to GitHub Pages automatically via GitHub Actions:
1. Ensure GitHub Pages is enabled in your repository:
   - Go to **Settings** > **Pages**
   - Under **Build and deployment** > **Source**, select **GitHub Actions** (or branch `gh-pages`)
2. Push any changes to `main`:
   ```bash
   git push origin main
   ```
3. GitHub Actions builds the `frontend` application and publishes it to GitHub Pages.
