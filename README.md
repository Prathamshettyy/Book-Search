# 📚 Book Search App

A modern full-stack book search application that enables users to search, filter, sort, and paginate through a list of books with an intuitive interface and robust backend support.

Built using **React**, **Material-UI**, **Express.js**, and **Node.js**. Deployed on **Netlify** (Frontend) and **Render** (Backend).

---

## 🚀 Live Demo

- 🔗 **Frontend**: [https://booksearchdev.netlify.app](https://booksearchdev.netlify.app)
- 🌐 **API**: [https://book-search-5x6s.onrender.com/api/books](https://book-search-5x6s.onrender.com/api/books)

---

## 🗂️ Task Fulfillment (React Developer Task 12)

### ✅ Day 1: Backend Setup and Search API Enhancement
- API accepts filters for **title**, **author**, and **genre** via query parameters.
- Single `/api/books` endpoint returns search results based on any combination of filters.

### ✅ Day 2: Pagination and Sorting Support
- Supports `page` and `pageSize` parameters for pagination.
- Supports sorting via `sortBy` (`title`, `author`, `publicationDate`) and `sortOrder` (`asc`, `desc`).
- Proper validation & fallback for invalid query values.

### ✅ Day 3: Frontend UI Implementation
- Search bar with filters for **title**, **author**, and **genre**.
- Dynamic book card rendering with elegant layout and styling.
- Responsive design with theme and accessibility.

### ✅ Day 4: Frontend Pagination and Sorting UI
- User-friendly pagination and page size control.
- Sorting controls for all supported fields.
- Displays number of results and current range.
- Loading spinner during API requests.

### ✅ Day 5: Error Handling and Validation
- Validates pagination and sort parameters.
- Fallback to default sort on invalid `sortBy`.
- Alerts for API failure and empty result sets.

### ✅ Day 6: Testing
- **Unit tests** implemented using **Jest** and **Supertest**.
- Backend `/api/books` endpoint tested for:
  - All-books fetch
  - Filtering by title
  - Pagination accuracy
  - Sorting correctness
  - Invalid `sortBy` fallback behavior
- All test cases **passed successfully**.

### ✅ Day 7: Documentation and Deployment
- This README includes full **documentation** of filters, sorting, and pagination behavior.
- Frontend and backend deployed on **Netlify** and **Render** respectively.

---

## ✨ Features

### 🔎 Search & Filters
- Search by **title**, **author**, and **genre**
- Real-time filtering with input fields

### 📊 Pagination & Sorting
- Change **page number** and **page size** (8/12/20/50)
- Sort by **title**, **author**, or **publication date**
- Ascending/descending order toggle

### 🎨 Modern UI (MUI + Custom Styling)
- Dark theme with glowing effect
- Responsive layout
- Tooltip on book titles
- Card hover effects

### ⚙️ Error Handling & Edge Cases
- Shows meaningful messages if API fails
- Displays graceful message if no books found
- Handles invalid sort input safely

---

## 🛠️ Tech Stack

| Frontend        | Backend        |
|----------------|----------------|
| React (Vite)    | Express.js     |
| Material-UI    | Node.js        |
| Axios          | CORS           |
| Framer Motion  | Jest + Supertest |

---

## 📁 Folder Structure
```
Book-Search/
├── backend/            # Express server with API
│   ├── server.js       # API code
│   └── tests/          # Unit tests (Jest)
├── book-frontend/      # React + Vite frontend
│   ├── App.js          # Main UI logic
│   └── .env.production # Contains API URL
```

---

## 📦 Install & Run Locally

### 1️⃣ Clone the Repo
```bash
git clone https://github.com/Prathamshettyy/Book-Search.git
cd Book-Search
```

### 2️⃣ Backend Setup
```bash
cd backend
npm install
npm start
```

### 3️⃣ Frontend Setup
```bash
cd ../book-frontend
npm install
npm run dev
```

> ⚠️ Ensure you have `.env` with: `REACT_APP_API_URL=http://localhost:5000`

---

## ✅ Run Backend Tests

```bash
cd backend
npm test
```

**Unit Testing (Jest + Supertest):**
- API endpoint `/api/books` tested for:
  - ✅ Returning all books
  - ✅ Filtering by title
  - ✅ Correct pagination behavior
  - ✅ Sorting by author in descending order
  - ✅ Handling of invalid sort parameters (fallback to default sort)
- Tests confirm the API behaves correctly in normal and edge cases

> ✔️ All tests passed successfully

---

## 📄 Deployment

### Frontend
- Hosted on **Netlify**
- `.env.production` sets: `REACT_APP_API_URL=https://book-search-5x6s.onrender.com`
- `netlify.toml` handles redirects and build setup

### Backend
- Hosted on **Render**
- Free web service using `server.js` and sample book data

---

## 📌 Author

**Pratham Shetty**  
GitHub: [@Prathamshettyy](https://github.com/Prathamshettyy)

---

## ✅ Status
> **Complete** – All features implemented, tested, and deployed.

---
