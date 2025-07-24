// backend/server.js

const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://booksearchdev.netlify.app'],
  methods: ['GET'],
};
app.use(cors(corsOptions));


// Sample in-memory data
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

// GET /api/books — supports filtering, sorting, pagination
app.get('/api/books', (req, res) => {
  let {
    title = '',
    author = '',
    genre = '',
    page = 1,
    pageSize = 10,
    sortBy = 'title',
    sortOrder = 'asc'
  } = req.query;

  page = parseInt(page, 10);
  pageSize = parseInt(pageSize, 10);
  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(pageSize) || pageSize < 1) pageSize = 10;
  if (pageSize > 100) pageSize = 100;

  // Validate sort parameters
  const validFields = ['title','author','genre','publicationDate'];
  if (!validFields.includes(sortBy)) sortBy = 'title';
  if (!['asc','desc'].includes(sortOrder)) sortOrder = 'asc';

  // Filter
  let filtered = books.filter(b =>
    (!title || b.title.toLowerCase().includes(title.toLowerCase())) &&
    (!author || b.author.toLowerCase().includes(author.toLowerCase())) &&
    (!genre || b.genre.toLowerCase().includes(genre.toLowerCase()))
  );

  // Sort
  filtered.sort((a, b) => {
    let A = a[sortBy], B = b[sortBy];
    if (sortBy === 'publicationDate') {
      A = new Date(A); B = new Date(B);
    } else if (typeof A === 'string') {
      A = A.toLowerCase(); B = B.toLowerCase();
    }
    if (A < B) return sortOrder === 'asc' ? -1 : 1;
    if (A > B) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Paginate
  const total = filtered.length;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const booksPage = filtered.slice(start, end);

  res.json({
    total,
    page,
    pageSize,
    books: booksPage
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
