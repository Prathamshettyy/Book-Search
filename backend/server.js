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

// Helper function for sorting
function sortBooks(data, sort_by, order) {
  return data.sort((a, b) => {
    let fieldA = a[sort_by];
    let fieldB = b[sort_by];

    // Case-insensitive string comparison for title and author and genre
    if (typeof fieldA === 'string') fieldA = fieldA.toLowerCase();
    if (typeof fieldB === 'string') fieldB = fieldB.toLowerCase();

    if (fieldA < fieldB) return order === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return order === 'asc' ? 1 : -1;
    return 0;
  });
}

// Search route with filtering, pagination, sorting
app.get('/api/books', (req, res) => {
  let { title, author, genre, page = 1, page_size = 10, sort_by = 'title', order = 'asc' } = req.query;

  page = parseInt(page);
  page_size = parseInt(page_size);

  if (isNaN(page) || page < 1) page = 1;
  if (isNaN(page_size) || page_size < 1) page_size = 10;
  if (page_size > 100) page_size = 100;

  // Allowed sort fields and order
  const validSortFields = ['title', 'author', 'publicationDate', 'genre'];
  if (!validSortFields.includes(sort_by)) sort_by = 'title';
  if (!['asc', 'desc'].includes(order)) order = 'asc';

  // Filter books
  let filteredBooks = books.filter((book) => {
    return (
      (!title || book.title.toLowerCase().includes(title.toLowerCase())) &&
      (!author || book.author.toLowerCase().includes(author.toLowerCase())) &&
      (!genre || book.genre.toLowerCase().includes(genre.toLowerCase()))
    );
  });

  // Sort books
  filteredBooks = sortBooks(filteredBooks, sort_by, order);

  // Pagination slice
  const total = filteredBooks.length;
  const startIndex = (page - 1) * page_size;
  const endIndex = startIndex + page_size;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  res.json({
    total,
    page,
    page_size,
    books: paginatedBooks,
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
