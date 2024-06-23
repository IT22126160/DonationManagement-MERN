const express = require('express');
const router = express.Router();
const Feedback = require('../models/feedback');

// Route to add feedback
router.post('/add', async (req, res) => {
  try {
    const { rating } = req.body;
    const newFeedback = new Feedback({ rating });
    await newFeedback.save();
    res.json({ message: 'Feedback added successfully' });
  } catch (error) {
    console.error('Error adding feedback:', error);
    res.status(500).json({ error: 'Failed to add feedback' });
  }
});

module.exports = router;