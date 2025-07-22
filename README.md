# Book Search Application

**React Developer Task 12 - Internship Round 2**

A full-stack book management application that allows users to search for books with advanced filtering, pagination, and sorting capabilities.

## 📋 Project Overview

This application demonstrates a complete search functionality implementation with:

• **Backend API** supporting multiple search filters
• **React Frontend** with dynamic search interface  
• **Real-time filtering** by title, author, and genre
• **Pagination** for large result sets
• **Sorting** by multiple criteria
• **Responsive design** for all device types

## 🚀 Tech Stack

### Backend
• **Node.js** - Runtime environment
• **Express.js** - Web application framework
• **CORS** - Cross-origin resource sharing

### Frontend
• **React.js** - Frontend framework
• **Axios** - HTTP client for API requests
• **Modern ES6+** - JavaScript features

## 📁 Project Structure

```
Book-Search/
├── backend/                    # Backend Express server
│   ├── server.js              # Main server file
│   ├── package.json           # Backend dependencies
│   └── node_modules/          # Backend modules
├── book-frontend/             # React frontend application
│   ├── src/
│   │   ├── App.js            # Main React component
│   │   ├── App.css           # Styling
│   │   └── index.js          # React entry point
│   ├── public/
│   ├── package.json          # Frontend dependencies
│   └── node_modules/         # Frontend modules
├── package.json              # Root package.json (if any)
├── package-lock.json         # Root package lock
└── README.md                 # Project documentation
```

## 🛠️ Installation & Setup

### Prerequisites
• Node.js (v14 or higher)
• npm or yarn package manager

### Backend Setup

1. **Clone the repository:**
```bash
git clone https://github.com/Prathamshettyy/Book-Search.git
cd Book-Search
```

2. **Navigate to backend directory:**
```bash
cd backend
```

3. **Install backend dependencies:**
```bash
npm install
```

4. **Start the backend server:**
```bash
node server.js
```
Server will run on `http://localhost:5000`

### Frontend Setup

1. **Open a new terminal and navigate to frontend directory:**
```bash
cd book-frontend
```

2. **Install frontend dependencies:**
```bash
npm install
```

3. **Start the React application:**
```bash
npm start
```
Application will open at `http://localhost:3000`

## 📖 API Documentation

### Base URL
`http://localhost:5000/api`

### Endpoints

#### GET /api/books
Search and filter books with pagination and sorting support.

**Query Parameters:**

| Parameter | Type | Description | Required | Default |
|-----------|------|-------------|----------|---------|
| `title` | string | Filter books by title (case-insensitive) | No | - |
| `author` | string | Filter books by author name (case-insensitive) | No | - |
| `genre` | string | Filter books by genre | No | - |
| `page` | integer | Page number for pagination | No | 1 |
| `pageSize` | integer | Number of results per page (max 100) | No | 10 |
| `sortBy` | string | Sort field: `title`, `author`, `genre`, `publicationDate` | No | title |
| `sortOrder` | string | Sort direction: `asc` or `desc` | No | asc |

**Example Requests:**

1. **Basic search:**
```
GET /api/books
```

2. **Search by title:**
```
GET /api/books?title=atomic
```

3. **Advanced search with pagination and sorting:**
```
GET /api/books?title=habit&page=1&pageSize=5&sortBy=publicationDate&sortOrder=desc
```

4. **Multiple filters:**
```
GET /api/books?author=orwell&genre=fiction&sortBy=title&sortOrder=asc
```

**Response Format:**
```json
{
  "total": 4,
  "page": 1,
  "pageSize": 10,
  "books": [
    {
      "id": 1,
      "title": "Atomic Habits",
      "author": "James Clear",
      "genre": "Self-Help",
      "publicationDate": "2018-10-16"
    },
    {
      "id": 2,
      "title": "1984",
      "author": "George Orwell",
      "genre": "Fiction",
      "publicationDate": "1949-06-08"
    }
  ]
}
```

**Error Response:**
```json
{
  "error": "Invalid parameters or server error"
}
```

## 🎯 Features Implemented

### Day 1-2: Backend Implementation ✅
- Enhanced book API with search functionality
- Multiple filter support (title, author, genre)
- Pagination with `page` and `pageSize` parameters
- Sorting by title, author, genre, and publication date
- Input validation and error handling
- Case-insensitive search functionality

### Day 3-4: Frontend Implementation ✅
- React-based search interface
- Dynamic search bar with filter inputs
- Real-time result updates
- Pagination controls (Previous/Next buttons)
- Sorting dropdown options
- Results per page selector
- Loading states during API requests
- Clear filters functionality

### Day 5: Validation & Error Handling ✅
- Frontend input validation
- Backend parameter validation
- Meaningful error messages for invalid requests
- Graceful handling of empty search results
- Error display for network issues

### Day 6: Testing ✅
- Backend API testing with various parameter combinations
- Frontend UI testing for all search scenarios
- Edge case testing (empty results, invalid parameters)
- Pagination boundary testing
- Sorting functionality verification

## 📱 Frontend Usage Guide

### Search Functionality
1. **Title Search:** Enter book title in the "Search by title" field
2. **Author Search:** Enter author name in the "Search by author" field
3. **Genre Search:** Enter genre in the "Search by genre" field
4. **Combined Search:** Use multiple filters simultaneously

### Sorting Options
• **Sort Field:** Choose from Title, Author, Genre, or Publication Date
• **Sort Order:** Select Ascending or Descending order
• **Dynamic Updates:** Results update automatically when sorting changes

### Pagination
• **Navigation:** Use Previous/Next buttons to navigate pages
• **Page Size:** Select 5, 10, 20, or 50 results per page
• **Page Info:** Current page and total pages displayed
• **Total Count:** Shows total number of matching results

### Additional Features
• **Clear Filters:** Reset all search criteria with one click
• **Loading States:** Visual feedback during API requests
• **Error Handling:** User-friendly error messages
• **Responsive Design:** Works on desktop, tablet, and mobile devices

## 🧪 Testing Results

### Backend API Tests
• ✅ Basic book retrieval: Returns all 4 sample books
• ✅ Title filtering: "animal" returns "Animal Farm"
• ✅ Author filtering: "orwell" returns 2 books by George Orwell
• ✅ Genre filtering: "fiction" returns fiction books only
• ✅ Pagination: `page=1&pageSize=2` returns first 2 books
• ✅ Sorting: `sortBy=publicationDate&sortOrder=desc` returns newest first
• ✅ Combined filters: Multiple criteria work together
• ✅ Invalid parameters: Returns appropriate error responses
• ✅ Edge cases: Empty results handled gracefully

### Frontend UI Tests
• ✅ Search inputs update results in real-time
• ✅ Pagination controls navigate correctly
• ✅ Sorting dropdowns change result order
• ✅ Clear filters resets all criteria
• ✅ Loading indicators show during requests
• ✅ Error messages display for failed requests
• ✅ Responsive design works on mobile devices

## 📊 Sample Data

The application includes 4 sample books for demonstration:

1. **Atomic Habits** by James Clear (Self-Help, 2018)
2. **1984** by George Orwell (Fiction, 1949)
3. **The Power of Habit** by Charles Duhigg (Self-Help, 2012)
4. **Animal Farm** by George Orwell (Fiction, 1945)

## 🚀 Deployment

### Backend Deployment (Render/Heroku)
1. Push code to GitHub repository
2. Connect repository to hosting platform
3. Set build/start command: `node backend/server.js`
4. Deploy and obtain backend URL

### Frontend Deployment (Netlify/Vercel)
1. Update `API_BASE_URL` in React app to deployed backend URL
2. Build the application: `npm run build` (in book-frontend directory)
3. Deploy the build folder to hosting platform
4. Obtain frontend URL

## 🔧 Development Notes

### Parameter Naming Convention
• **Frontend sends:** camelCase (`pageSize`, `sortBy`, `sortOrder`)
• **Backend expects:** camelCase (matching frontend)
• **Response format:** camelCase for consistency

### Performance Considerations
• In-memory data structure for fast searching
• Efficient filtering and sorting algorithms
• Pagination reduces data transfer
• Client-side state management minimizes API calls

## 🐛 Known Issues & Limitations

• Uses in-memory data (resets on server restart)
• Limited to 4 sample books for demonstration
• No user authentication or book management features
• Basic error handling (can be enhanced for production)

## 🔮 Future Enhancements

• Database integration (MongoDB/PostgreSQL)
• User authentication and favorites
• Book cover images and detailed descriptions
• Advanced search with multiple criteria
• Admin panel for book management
• Search history and recommendations

## 📄 Assignment Submission

**Task:** React Developer Task 12 - Book Search Implementation  
**Deadline:** July 29, 2025  
**Repository:** https://github.com/Prathamshettyy/Book-Search.git  
**Developer:** [Your Name]  
**University:** [Your University]

### Submission Checklist
- [x] Backend API with search, filter, pagination, sorting
- [x] React frontend with complete search interface
- [x] Error handling and validation implementation
- [x] Comprehensive testing completed
- [x] Documentation and README prepared
- [ ] Application deployed to cloud platform
- [ ] Final submission package prepared

**Note:** This application demonstrates full-stack development skills including API design, React frontend development, state management, error handling, and responsive design principles.

## 🤝 Contributing

This project is part of an internship assignment. For any questions or suggestions, please contact the developer through the repository.

## 📧 Contact

For any queries regarding this project or internship submission, please contact:
- GitHub: [Prathamshettyy](https://github.com/Prathamshettyy)
- Repository: [Book-Search](https://github.com/Prathamshettyy/Book-Search)