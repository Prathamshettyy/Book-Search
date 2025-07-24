const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:3000',
      'https://book-searchdev.netlify.app'
    ];
    
    // Allow requests with no origin (mobile apps, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Sample data
const books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help', publicationDate: '2018-10-16' },
  { id: 2, title: '1984', author: 'George Orwell', genre: 'Fiction', publicationDate: '1949-06-08' },
  { id: 3, title: 'The Power of Habit', author: 'Charles Duhigg', genre: 'Self-Help', publicationDate: '2012-02-28' },
  { id: 4, title: 'Animal Farm', author: 'George Orwell', genre: 'Fiction', publicationDate: '1945-08-17' },
  { id: 5, title: 'To Kill a Mockingbird', author: 'Harper Lee', genre: 'Classic', publicationDate: '1960-07-11' },
  { id: 6, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', genre: 'Classic', publicationDate: '1925-04-10' },
  { id: 7, title: 'The Hobbit', author: 'J.R.R. Tolkien', genre: 'Fantasy', publicationDate: '1937-09-21' },
  { id: 8, title: 'Harry Potter and the Sorcerer\'s Stone', author: 'J.K. Rowling', genre: 'Fantasy', publicationDate: '1997-06-26' },
  { id: 9, title: 'Deep Work', author: 'Cal Newport', genre: 'Productivity', publicationDate: '2016-01-05' },
  { id: 10, title: 'Rich Dad Poor Dad', author: 'Robert Kiyosaki', genre: 'Personal Finance', publicationDate: '1997-04-01' },
  { id: 11, title: 'The Catcher in the Rye', author: 'J.D. Salinger', genre: 'Classic', publicationDate: '1951-07-16' },
  { id: 12, title: 'Sapiens', author: 'Yuval Noah Harari', genre: 'History', publicationDate: '2011-01-01' },
  { id: 13, title: 'The Lean Startup', author: 'Eric Ries', genre: 'Business', publicationDate: '2011-09-13' },
  { id: 14, title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', genre: 'Psychology', publicationDate: '2011-10-25' },
  { id: 15, title: 'The Alchemist', author: 'Paulo Coelho', genre: 'Fiction', publicationDate: '1988-01-01' },
  { id: 16, title: 'The Lord of the Rings', author: 'J.R.R. Tolkien', genre: 'Fantasy', publicationDate: '1954-07-29' },
  { id: 17, title: 'Educated', author: 'Tara Westover', genre: 'Memoir', publicationDate: '2018-02-18' },
  { id: 18, title: 'The Subtle Art of Not Giving a F*ck', author: 'Mark Manson', genre: 'Self-Help', publicationDate: '2016-09-13' },
  { id: 19, title: 'Becoming', author: 'Michelle Obama', genre: 'Memoir', publicationDate: '2018-11-13' },
  { id: 20, title: 'Dune', author: 'Frank Herbert', genre: 'Science Fiction', publicationDate: '1965-08-01' }
];


// Search route with filtering, pagination, sorting
app.get('/api/books', (req, res) => {
  // FIXED: Changed to camelCase parameters to match frontend
  let { title, author, genre, page = 1, pageSize = 10, sortBy = 'title', sortOrder = 'asc' } = req.query;

  page = parseInt(page);
  pageSize = parseInt(pageSize);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(pageSize) || pageSize < 1) pageSize = 10;
  if (pageSize > 100) pageSize = 100;

  // Allowed sort fields and order
  const validSortFields = ['title', 'author', 'publicationDate', 'genre'];
  if (!validSortFields.includes(sortBy)) sortBy = 'title';
  if (!['asc', 'desc'].includes(sortOrder)) sortOrder = 'asc';

  // Filter books
  let filteredBooks = books.filter((book) => {
    return (
      (!title || book.title.toLowerCase().includes(title.toLowerCase())) &&
      (!author || book.author.toLowerCase().includes(author.toLowerCase())) &&
      (!genre || book.genre.toLowerCase().includes(genre.toLowerCase()))
    );
  });

  // FIXED: Improved sorting function
  filteredBooks.sort((a, b) => {
    let fieldA = a[sortBy];
    let fieldB = b[sortBy];

    // Handle dates properly
    if (sortBy === 'publicationDate') {
      fieldA = new Date(fieldA);
      fieldB = new Date(fieldB);
    } else if (typeof fieldA === 'string') {
      fieldA = fieldA.toLowerCase();
      fieldB = fieldB.toLowerCase();
    }

    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination slice
  const total = filteredBooks.length;
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  // FIXED: Changed response to match frontend expectations
  res.json({
    total,
    page,
    pageSize,  // Changed from page_size to pageSize
    books: paginatedBooks,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

