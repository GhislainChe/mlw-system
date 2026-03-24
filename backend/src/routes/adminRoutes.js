const express = require('express');

const {
  getAdminDashboard,
  getAdminLanguages,
  createAdminLanguage,
  updateAdminLanguage,
  deleteAdminLanguage,
} = require('../controllers/adminController');
const authenticateToken = require('../middleware/authMiddleware');
const requireAdmin = require('../middleware/adminMiddleware');

const router = express.Router();

router.get('/dashboard', authenticateToken, requireAdmin, getAdminDashboard);
router.get('/languages', authenticateToken, requireAdmin, getAdminLanguages);
router.post('/languages', authenticateToken, requireAdmin, createAdminLanguage);
router.put('/languages/:languageId', authenticateToken, requireAdmin, updateAdminLanguage);
router.delete('/languages/:languageId', authenticateToken, requireAdmin, deleteAdminLanguage);

module.exports = router;
