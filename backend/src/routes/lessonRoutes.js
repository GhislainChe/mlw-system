const express = require('express');

const {
  getLessonsByLanguage,
  getLessonById,
} = require('../controllers/lessonController');

const router = express.Router();

router.get('/lessons/language/:languageId', getLessonsByLanguage);
router.get('/lessons/:languageId', getLessonsByLanguage);
router.get('/lesson/:lessonId', getLessonById);

module.exports = router;
