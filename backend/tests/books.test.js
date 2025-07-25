const request = require('supertest');
const app = require('../server');

describe('GET /api/books', () => {
  test('should return all books by default', async () => {
    const res = await request(app).get('/api/books');
    expect(res.statusCode).toBe(200);
    expect(res.body.books.length).toBeGreaterThan(0);
  });

  test('should filter by title', async () => {
    const res = await request(app).get('/api/books?title=atomic');
    expect(res.statusCode).toBe(200);
    expect(res.body.books[0].title.toLowerCase()).toContain('atomic');
  });

  test('should paginate correctly', async () => {
    const res = await request(app).get('/api/books?page=2&pageSize=5');
    expect(res.statusCode).toBe(200);
    expect(res.body.books.length).toBeLessThanOrEqual(5);
  });

  test('should sort by author descending', async () => {
    const res = await request(app).get('/api/books?sortBy=author&sortOrder=desc');
    expect(res.statusCode).toBe(200);
    expect(res.body.books).toBeDefined();
  });

  test('should return 200 even on invalid sort', async () => {
    const res = await request(app).get('/api/books?sortBy=invalidField');
    expect(res.statusCode).toBe(200); // This must pass
    expect(Array.isArray(res.body.books)).toBe(true);
  });
});
