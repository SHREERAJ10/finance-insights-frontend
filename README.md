# Fynsights

A fullstack finance insights app that helps users track income, expenses, saving goals, and get written insights based on their financial data.

This repository contains the frontend of the application.

Live demo: [Fynsights](https://fynsight.vercel.app/)

---

## What this app does

Fynsights allows users to:
- Add income and expenses over time
- Create income sources and expense categories
- Set a monthly saving goal
- View written financial insights as data accumulates
- Perform full CRUD operations
- Filter, sort, and paginate records

Insights are displayed as swiper slider cards.  
The UI is clean, black and white, minimal, and fully responsive.

---

## Tech stack

- React.js
- React Router DOM
- Tailwind CSS
- shadcn/ui
- lucide-react
- Swiper
- react-toastify
- uuid
- Firebase Authentication SDK

---

## Authentication

- Email and password authentication using Firebase Auth
- Protected routes on the frontend
- Firebase ID token is sent with API requests

---

## Environment variables

Create a `.env` file in the root of the frontend project (Vite):

```env
VITE_API_KEY=""
VITE_AUTH_DOMAIN=""
VITE_PROJECT_ID=""
VITE_STORAGE_BUCKET=""
VITE_MESSAGING_SENDER_ID=""
VITE_APP_ID=""
```

---

## Running the frontend locally

1. Clone the repository

```bash
git clone https://github.com/SHREERAJ10/finance-insights-frontend.git
cd finance-insights-frontend
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Build for production

```bash
npm run build
```

---

## Notes

- The frontend requires the backend API to be running
- Make sure the API base URL is configured correctly
- This project was built as a personal learning and hobby project
