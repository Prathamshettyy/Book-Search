import React, { useState } from 'react';
import axios from 'axios';

const BookSearch = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [genre, setGenre] = useState('');
  const [books, setBooks] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/books', {
        params: { title, author, genre },
      });
      setBooks(response.data);
      setSubmitted(true);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleReset = () => {
    setTitle('');
    setAuthor('');
    setGenre('');
    setBooks([]);
    setSubmitted(false);
  };

  return (
    <div>
      <h2>
        <img
          src="https://cdn-icons-png.flaticon.com/512/29/29302.png"
          alt="Books"
          style={{ width: '24px', verticalAlign: 'middle', marginRight: '8px' }}
        />
        Book Search
      </h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        type="text"
        placeholder="Genre"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={handleReset} style={{ marginLeft: '8px' }}>Reset</button>

      {books.length === 0 && submitted && (
        <p>No books found for the given filters.</p>
      )}

      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author} ({book.genre})
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BookSearch;
