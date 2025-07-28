// App.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Container,
  TextField,
  Button,
  Grid,
  Card,
  Typography,
  AppBar,
  Toolbar,
  CircularProgress,
  Box,
  Alert,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Pagination,
  ThemeProvider,
  createTheme,
  CssBaseline,
  Stack,
  Tooltip
} from '@mui/material';
import { keyframes } from '@emotion/react';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0bec5',
    }
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
    h6: {
      fontWeight: 500,
    }
  },
});

const glowPulse = keyframes`
  0% { box-shadow: 0 0 10px 2px rgba(187,134,252, 0.3); }
  50% { box-shadow: 0 0 20px 6px rgba(187,134,252, 0.6); }
  100% { box-shadow: 0 0 10px 2px rgba(187,134,252, 0.3); }
`;

const API_BASE_URL = process.env.REACT_APP_API_URL;
if (!API_BASE_URL) {
  console.error('REACT_APP_API_URL is not defined. Please set it in your .env file.');
}

function App() {
  const [filters, setFilters] = useState({ title: '', author: '', genre: '' });
  const [sort, setSort] = useState({ sortBy: 'title', sortOrder: 'asc' });
  const [pagination, setPagination] = useState({ page: 1, pageSize: 8, total: 0 });
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchBooks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const params = {
        ...filters,
        page: pagination.page,
        pageSize: pagination.pageSize,
        sortBy: sort.sortBy,
        sortOrder: sort.sortOrder,
      };
      Object.keys(params).forEach(key => (params[key] === '' || params[key] === null) && delete params[key]);
      const response = await axios.get(`${API_BASE_URL}/api/books`, { params });
      setBooks(response.data.books || []);
      setPagination(prev => ({ ...prev, total: response.data.total || 0 }));
    } catch (err) {
      setError('Failed to fetch books. Please ensure the backend server is running.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  }, [filters, pagination.page, pagination.pageSize, sort]);

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleSortChange = (e) => {
    setSort(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePageChange = (event, newPage) => {
    setPagination(prev => ({ ...prev, page: newPage }));
  };

  const handlePageSizeChange = (e) => {
    const newSize = parseInt(e.target.value, 10);
    setPagination(prev => ({ ...prev, pageSize: newSize, page: 1 }));
  };

  const goToPage = (newPage) => {
    const totalPages = Math.ceil(pagination.total / pagination.pageSize);
    if (newPage >= 1 && newPage <= totalPages) {
      setPagination(prev => ({ ...prev, page: newPage }));
    }
  };

  const clearFilters = () => {
    setFilters({ title: '', author: '', genre: '' });
    setSort({ sortBy: 'title', sortOrder: 'asc' });
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const totalPages = Math.ceil(pagination.total / pagination.pageSize);
  const startResult = (pagination.page - 1) * pagination.pageSize + 1;
  const endResult = Math.min(pagination.page * pagination.pageSize, pagination.total);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', background: 'linear-gradient(135deg, #070707ff, #121212)' }}>
        <AppBar
          position="static"
          elevation={0}
          sx={{
            backgroundColor: '#060606ff',
            animation: `${glowPulse} 3s ease-in-out infinite`,
            borderBottom: '1px solid #333',
          }}
        >
          <Toolbar sx={{ justifyContent: 'center' }}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: 'bold', color: 'primary.main', fontSize: '1.5rem' }}
            >
              Book Search
            </Typography>
          </Toolbar>
        </AppBar>

        <Container sx={{ py: { xs: 2, sm: 4 }, px: { xs: 2, sm: 4 } }}>
          <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 4, background: 'rgba(255,255,255,0.04)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth label="Title" name="title" value={filters.title} onChange={handleFilterChange} variant="outlined" size="small" sx={{ borderRadius: 2 }} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth label="Author" name="author" value={filters.author} onChange={handleFilterChange} variant="outlined" size="small" sx={{ borderRadius: 2 }} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField fullWidth label="Genre" name="genre" value={filters.genre} onChange={handleFilterChange} variant="outlined" size="small" sx={{ borderRadius: 2 }} />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button fullWidth variant="outlined" onClick={clearFilters} sx={{ borderRadius: 2, textTransform: 'none' }}>Clear Filters</Button>
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="center" sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Sort By</InputLabel>
                  <Select value={sort.sortBy} label="Sort By" name="sortBy" onChange={handleSortChange} sx={{ borderRadius: 2 }}>
                    <MenuItem value="title">Title</MenuItem>
                    <MenuItem value="author">Author</MenuItem>
                    <MenuItem value="genre">Genre</MenuItem>
                    <MenuItem value="publicationDate">Date</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth size="small">
                  <InputLabel>Order</InputLabel>
                  <Select value={sort.sortOrder} label="Order" name="sortOrder" onChange={handleSortChange} sx={{ borderRadius: 2 }}>
                    <MenuItem value="asc">Ascending</MenuItem>
                    <MenuItem value="desc">Descending</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Paper>

          <Box sx={{ mb: 2, textAlign: 'center' }}>
            {pagination.total > 0 && !loading && (
              <Typography variant="body2" color="text.secondary">
                Showing {startResult} - {endResult} of {pagination.total} results
              </Typography>
            )}
          </Box>

          {loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 5 }}><CircularProgress color="primary" /></Box>
          ) : error ? (
            <Alert severity="error" variant="filled">{error}</Alert>
          ) : (
            <>
              <Grid container spacing={3} justifyContent="center" alignItems="stretch">
                {books.length > 0 ? books.map((book) => (
                  <Grid item key={book.id} display="flex" xs={12} sm="auto">
                    <Card
                      sx={{
                        width: 240,
                        flexGrow: 1,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        p: 2,
                        backdropFilter: 'blur(6px)',
                        backgroundColor: 'rgba(30, 30, 30, 0.7)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 20px -8px rgba(187, 134, 252, 0.4)',
                        borderRadius: 4,
                        transition: 'all 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-6px)',
                          boxShadow: '0 12px 30px -8px rgba(187, 134, 252, 0.6)'
                        }
                      }}
                    >
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Tooltip title={book.title} arrow placement="top">
                          <Typography
                            variant="h6"
                            component="div"
                            sx={{
                              fontWeight: 600,
                              fontSize: '1rem',
                              color: 'primary.main',
                              lineHeight: 1.3,
                              overflow: 'hidden',
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: 1,
                              cursor: 'default',
                              transition: 'all 0.2s ease-in-out',
                              '&:hover': {
                                textDecoration: 'underline',
                                color: 'primary.light'
                              }
                            }}
                          >
                            {book.title}
                          </Typography>
                        </Tooltip>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                          }}
                        >
                          <strong>Author:</strong> {book.author}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                          }}
                        >
                          <strong>Genre:</strong> {book.genre}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            overflow: 'hidden',
                            display: '-webkit-box',
                            WebkitBoxOrient: 'vertical',
                            WebkitLineClamp: 1,
                            wordBreak: 'break-word',
                            whiteSpace: 'normal',
                          }}
                        >
                          <strong>Published:</strong> {new Date(book.publicationDate).toLocaleDateString()}
                        </Typography>
                      </Box>
                    </Card>
                  </Grid>
                )) : (
                  <Grid item xs={12}>
                    <Paper elevation={4} sx={{ p: 4, width: '100%', textAlign: 'center', borderRadius: 3 }}>
                      <Typography>No books found for the selected criteria.</Typography>
                    </Paper>
                  </Grid>
                )}
              </Grid>

              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 4, gap: 2 }}>
                {totalPages > 1 && (
                  <Pagination
                    count={totalPages}
                    page={pagination.page}
                    onChange={handlePageChange}
                    color="primary"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        borderRadius: '50%',
                        color: 'primary.main',
                      },
                      '& .Mui-selected': {
                        backgroundColor: 'primary.main',
                        color: '#000',
                      }
                    }}
                  />
                )}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Button variant="outlined" onClick={() => goToPage(pagination.page - 1)} disabled={pagination.page <= 1}>Prev</Button>
                  <FormControl size="small" sx={{ minWidth: 120 }}>
                    <InputLabel>Per Page</InputLabel>
                    <Select value={pagination.pageSize} label="Per Page" onChange={handlePageSizeChange}>
                      {[8, 12, 20, 50].map(size => (
                        <MenuItem key={size} value={size}>{size}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <Button variant="outlined" onClick={() => goToPage(pagination.page + 1)} disabled={pagination.page >= totalPages}>Next</Button>
                </Stack>
              </Box>
            </>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
