const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

// Sample data
const books = [
  { id: 1, title: 'Atomic Habits', author: 'James Clear', genre: 'Self-Help' },
  { id: 2, title: '1984', author: 'George Orwell', genre: 'Fiction' },
  { id: 3, title: 'The Power of Habit', author: 'Charles Duhigg', genre: 'Self-Help' },
  { id: 4, title: 'Animal Farm', author: 'George Orwell', genre: 'Fiction' },
];

// Search route
app.get('/api/books', (req, res) => {
  const { title, author, genre } = req.query;

  const filteredBooks = books.filter((book) => {
    return (
      (!title || book.title.toLowerCase().includes(title.toLowerCase())) &&
      (!author || book.author.toLowerCase().includes(author.toLowerCase())) &&
      (!genre || book.genre.toLowerCase().includes(genre.toLowerCase()))
    );
  });

  res.json(filteredBooks);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
