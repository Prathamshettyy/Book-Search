const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

// Sample data
const books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help', publicationDate: '2018-10-16' },
  { id: 2, title: '1984', author: 'George Orwell', genre: 'Fiction', publicationDate: '1949-06-08' },
  { id: 3, title: 'The Power of Habit', author: 'Charles Duhigg', genre: 'Self-Help', publicationDate: '2012-02-28' },
  { id: 4, title: 'Animal Farm', author: 'George Orwell', genre: 'Fiction', publicationDate: '1945-08-17' },
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
