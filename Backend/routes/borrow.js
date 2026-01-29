const express = require('express');
const router = express.Router();
const BorrowLog = require('../models/BorrowLog');
const Book = require('../models/Book');
const authMiddleware = require('../middleware/auth');

// User: POST /api/borrow
router.post('/', authMiddleware('user'), async (req, res) => {
  const { bookId, latitude, longitude } = req.body;
  const userId = req.headers['x-user-id'];

  if (!bookId || !userId || latitude === undefined || longitude === undefined) {
    return res.status(400).json({ error: 'Book ID, User ID, latitude, and longitude are required' });
  }

  if (typeof latitude !== 'number' || typeof longitude !== 'number') {
    return res.status(400).json({ error: 'Latitude and longitude must be numbers' });
  }

  try {
    const book = await Book.findByPk(bookId);
    if (!book || book.stock <= 0) return res.status(400).json({ error: 'Book not available' });

    await book.update({ stock: book.stock - 1 });
    const borrowLog = await BorrowLog.create({ userId: parseInt(userId), bookId, latitude, longitude });
    res.status(201).json(borrowLog);
  } catch (error) {
    res.status(500).json({ error: 'Failed to borrow book' });
  }
});

module.exports = router;