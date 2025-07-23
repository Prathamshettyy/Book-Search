import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [filters, setFilters] = useState({ title: '', author: '', genre: '' });
  const [pagination, setPagination] = useState({ page: 1, pageSize: 10, total: 0 });
  const [sort, setSort] = useState({ sortBy: 'title', sortOrder: 'asc' });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      setError('');
      try {
        const params = {
          ...filters,
          page: pagination.page,
          pageSize: pagination.pageSize,
          sortBy: sort.sortBy,
          sortOrder: sort.sortOrder
        };

        // Remove empty filter values
        Object.keys(params).forEach(key => {
          if (params[key] === '') {
            delete params[key];
          }
        });

        const response = await axios.get(`${API_BASE_URL}/api/books`, { params });
        setBooks(response.data.books || []);
        setPagination(prev => ({ ...prev, total: response.data.total || 0 }));
      } catch (err) {
        setError('Failed to fetch books. Please try again.');
        setBooks([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [filters, pagination.page, pagination.pageSize, sort]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSortChange = (e) => {
    const { name, value } = e.target;
    setSort(prev => ({ ...prev, [name]: value }));
  };

  const goToPage = (newPage) => {
    const totalPages = Math.ceil(pagination.total / pagination.pageSize);
    if (newPage >= 1 && newPage <= totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value);
    setPagination(prev => ({ ...prev, pageSize: newSize, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({ title: '', author: '', genre: '' });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const totalPages = Math.ceil(pagination.total / pagination.pageSize);
  const startResult = (pagination.page - 1) * pagination.pageSize + 1;
  const endResult = Math.min(pagination.page * pagination.pageSize, pagination.total);

  return (
    <div style={{ maxWidth: 700, margin: 'auto', padding: 20, fontFamily: 'Arial' }}>
      <h1>Book Search Application</h1>

      {/* Filter Inputs */}
      <div style={{ marginBottom: 20 }}>
        <input
          type="text"
          name="title"
          placeholder="Search by title"
          value={filters.title}
          onChange={handleFilterChange}
          style={{ marginRight: 10, padding: '8px', width: '30%' }}
        />
        <input
          type="text"
          name="author"
          placeholder="Search by author"
          value={filters.author}
          onChange={handleFilterChange}
          style={{ marginRight: 10, padding: '8px', width: '30%' }}
        />
        <input
          type="text"
          name="genre"
          placeholder="Search by genre"
          value={filters.genre}
          onChange={handleFilterChange}
          style={{ padding: '8px', width: '30%' }}
        />
        <button onClick={clearFilters} style={{ marginLeft: 10, padding: '8px 12px' }}>Clear Filters</button>
      </div>

      {/* Sorting */}
      <div style={{ marginBottom: 20 }}>
        <label>
          Sort by:
          <select
            name="sortBy"
            value={sort.sortBy}
            onChange={handleSortChange}
            style={{ marginLeft: 5, marginRight: 20, padding: '6px' }}
          >
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="genre">Genre</option>
            <option value="publicationDate">Publication Date</option>
          </select>
        </label>
        <label>
          Order:
          <select
            name="sortOrder"
            value={sort.sortOrder}
            onChange={handleSortChange}
            style={{ marginLeft: 5, padding: '6px' }}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </label>
      </div>

      {/* Result Info */}
      <div style={{ marginBottom: 20 }}>
        {pagination.total > 0 && <div>Showing {startResult} - {endResult} of {pagination.total} results</div>}
      </div>

      {/* Loading and Error */}
      {loading && <div>Loading books...</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      {/* Book List */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {!loading && books.length === 0 && <li>No books found.</li>}
        {books.map(book => (
          <li key={book.id} style={{ marginBottom: 15, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>
            <strong>{book.title}</strong><br />
            <em>{book.author}</em><br />
            Genre: {book.genre}<br />
            Published: {book.publicationDate ? new Date(book.publicationDate).toLocaleDateString() : 'N/A'}
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div style={{ marginTop: 20 }}>
          <button
            onClick={() => goToPage(pagination.page - 1)}
            disabled={pagination.page <= 1}
            style={{ marginRight: 10, padding: '6px 12px' }}
          >
            Prev
          </button>
          <span>Page {pagination.page} of {totalPages}</span>
          <button
            onClick={() => goToPage(pagination.page + 1)}
            disabled={pagination.page >= totalPages}
            style={{ marginLeft: 10, padding: '6px 12px' }}
          >
            Next
          </button>

          <label style={{ marginLeft: 20 }}>
            Results per page:
            <select
              value={pagination.pageSize}
              onChange={handlePageSizeChange}
              style={{ marginLeft: 5, padding: '4px' }}
            >
              {[2, 5, 10, 20, 50].map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </label>
        </div>
      )}
    </div>
  );
}

export default App;
