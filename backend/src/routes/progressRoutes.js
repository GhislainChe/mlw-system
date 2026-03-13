const express = require('express');

const {
  markLessonCompleted,
  getUserProgress,
} = require('../controllers/progressController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:lessonId', authenticateToken, markLessonCompleted);
router.get('/', authenticateToken, getUserProgress);

module.exports = router;
