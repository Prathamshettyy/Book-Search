const express = require('express');
const router = express.Router();
const app = require('../server');
const books = require('../data/books');

router.get('/', (req, res) => {
  let { title, author, genre, page, pageSize, sortBy, sortOrder } = req.query;

  // Convert to correct types and set defaults
  page = parseInt(page) || 1;
  pageSize = parseInt(pageSize) || 10;
  sortOrder = sortOrder?.toLowerCase() === 'desc' ? 'desc' : 'asc';
  sortBy = sortBy || 'title';

  // Validate
  const validSortFields = ['title', 'author', 'publicationDate'];
  if (!validSortFields.includes(sortBy)) {
    return res.status(400).json({
      success: false,
      message: `Invalid sortBy value. Must be one of: ${validSortFields.join(', ')}`,
    });
  }

  if (page <= 0 || pageSize <= 0) {
    return res.status(400).json({
      success: false,
      message: `page and pageSize must be positive numbers`,
    });
  }

  // Filter by title, author, genre
  let filteredBooks = books;
  if (title) {
    filteredBooks = filteredBooks.filter(book =>
      book.title.toLowerCase().includes(title.toLowerCase())
    );
  }

  if (author) {
    filteredBooks = filteredBooks.filter(book =>
      book.author.toLowerCase().includes(author.toLowerCase())
    );
  }

  if (genre) {
    filteredBooks = filteredBooks.filter(book =>
      book.genre.toLowerCase().includes(genre.toLowerCase())
    );
  }

  // Sort
  filteredBooks.sort((a, b) => {
    const fieldA = a[sortBy].toLowerCase ? a[sortBy].toLowerCase() : a[sortBy];
    const fieldB = b[sortBy].toLowerCase ? b[sortBy].toLowerCase() : b[sortBy];

    if (fieldA < fieldB) return sortOrder === 'asc' ? -1 : 1;
    if (fieldA > fieldB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination
  const totalItems = filteredBooks.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedBooks = filteredBooks.slice(startIndex, startIndex + pageSize);

  // Return result
  res.json({
    success: true,
    totalItems,
    totalPages,
    currentPage: page,
    books: paginatedBooks
  });
});

module.exports = router;
