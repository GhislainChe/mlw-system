const express = require('express');

const {
  getDashboardStats,
  getRecentLessons,
} = require('../controllers/dashboardController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/stats', authMiddleware, getDashboardStats);
router.get('/recent-lessons', authMiddleware, getRecentLessons);

module.exports = router;
