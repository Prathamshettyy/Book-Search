# 📚 Book Search App

A modern full-stack web application built with **React** and **Express** to search and browse books with dynamic filters, sorting, and pagination. Deployed on **Netlify** (frontend) and **Render** (backend).

---

## 🔗 Live Demo

- **Frontend** (React):  
  [https://booksearchdev.netlify.app](https://booksearchdev.netlify.app)

- **Backend** (Express API):  
  [https://book-search-5x6s.onrender.com/api/books](https://book-search-5x6s.onrender.com/api/books)

---

## 🚀 Features

✅ Search by **title**, **author**, and **genre**  
✅ Sort results by **title**, **author**, **genre**, or **publication date** (asc/desc)  
✅ Paginate through books (select 8 / 12 / 20 / 50 per page)  
✅ Display of result range: `Showing 1 - 8 of 20 results`  
✅ Beautiful modern dark UI with tooltips, hover effects, and animations  
✅ Graceful error handling and loading spinners  
✅ Responsive layout for desktop and mobile

---

## 🛠 Tech Stack

| Layer     | Technology                  |
|-----------|-----------------------------|
| Frontend  | React, Material UI (MUI)    |
| Backend   | Node.js, Express            |
| Styling   | Emotion + MUI theming       |
| Hosting   | Netlify (frontend), Render (backend) |

---

## 📁 Project Structure

```
Book-Search/
├── backend/            # Express.js server
│   └── server.js
├── book-frontend/      # React frontend
│   ├── public/
│   ├── src/
│   └── .env.production
├── netlify.toml        # Netlify build settings
└── README.md
```

---

## ⚙️ Environment Variables

Make sure this variable is set for the frontend to connect to the backend API:

### `.env.production` or Netlify environment variable:

```
REACT_APP_API_URL=https://book-search-5x6s.onrender.com
```

---

## 🧪 Manual Testing Summary

| Scenario                                 | Result       |
|------------------------------------------|--------------|
| Filter by title/author/genre             | ✅ Working   |
| Pagination buttons + dropdown            | ✅ Working   |
| Sort by various fields                   | ✅ Working   |
| Clear Filters resets inputs              | ✅ Working   |
| Loading spinner while fetching           | ✅ Shown     |
| No result fallback message               | ✅ Graceful  |
| Backend handles invalid inputs safely    | ✅ Validated |
| Mobile responsiveness                    | ✅ Good      |

---

## 🧑‍💻 Local Development

### Prerequisites

- Node.js and npm installed

---

### Backend (Express API)
```bash
cd backend
npm install
node server.js
```
Runs at: `http://localhost:5000/api/books`

---

### Frontend (React App)
```bash
cd book-frontend
npm install
npm start
```
Runs at: `http://localhost:3000`

Make sure `.env` or `.env.production` includes:
```
REACT_APP_API_URL=http://localhost:5000
```

---

## 📦 Deployment Notes

### Netlify (Frontend)
- Set `REACT_APP_API_URL` in environment variables.
- Or use `netlify.toml`:
  ```toml
  [build.environment]
  REACT_APP_API_URL = https://book-search-5x6s.onrender.com
  ```

### Render (Backend)
- Node environment auto-detects `server.js`
- Port is set using `process.env.PORT`

---

## 📧 Contact

Made by **Pratham R Shetty**  
Frontend: React • Backend: Express • Styling: MUI  
[https://github.com/Prathamshettyy](https://github.com/Prathamshettyy)