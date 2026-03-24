const express = require('express');

const {
  getAdminDashboard,
  getAdminLanguages,
  createAdminLanguage,
  updateAdminLanguage,
  deleteAdminLanguage,
  getAdminLessons,
  createAdminLesson,
  updateAdminLesson,
  deleteAdminLesson,
} = require('../controllers/adminController');
const authenticateToken = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/dashboard', authenticateToken, requireAdmin, getAdminDashboard);
router.get('/languages', authenticateToken, requireAdmin, getAdminLanguages);
router.post('/languages', authenticateToken, requireAdmin, createAdminLanguage);
router.put('/languages/:languageId', authenticateToken, requireAdmin, updateAdminLanguage);
router.delete('/languages/:languageId', authenticateToken, requireAdmin, deleteAdminLanguage);
router.get('/lessons', authenticateToken, requireAdmin, getAdminLessons);
router.post('/lessons', authenticateToken, requireAdmin, createAdminLesson);
router.put('/lessons/:lessonId', authenticateToken, requireAdmin, updateAdminLesson);
router.delete('/lessons/:lessonId', authenticateToken, requireAdmin, deleteAdminLesson);

module.exports = router;
