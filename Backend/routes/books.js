const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const authMiddleware = require('../middleware/auth');

// Public: GET /api/books
router.get('/', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// Public: GET /api/books/:id
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// Admin: POST /api/books
router.post('/', authMiddleware('admin'), async (req, res) => {
  const { title, author, stock } = req.body;
  if (!title || !author) return res.status(400).json({ error: 'Title and author are required' });
  try {
    const book = await Book.create({ title, author, stock });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// Admin: PUT /api/books/:id
router.put('/:id', authMiddleware('admin'), async (req, res) => {
  const { title, author, stock } = req.body;
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    await book.update({ title, author, stock });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// Admin: DELETE /api/books/:id
router.delete('/:id', authMiddleware('admin'), async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    await book.destroy();
    res.json({ message: 'Book deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

module.exports = router;