const express = require('express');

const {
  markLessonCompleted,
  getUserProgress,
  getRecentProgress,
} = require('../controllers/progressController');
const authenticateToken = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/complete', authenticateToken, markLessonCompleted);
router.post('/:lessonId', authenticateToken, markLessonCompleted);
router.get('/recent', authenticateToken, getRecentProgress);
router.get('/', authenticateToken, getUserProgress);

module.exports = router;
