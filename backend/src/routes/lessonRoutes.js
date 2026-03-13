const express = require('express');

const { getLessonsByLanguage } = require('../controllers/lessonController');

const router = express.Router();

router.get('/:languageId', getLessonsByLanguage);

module.exports = router;
