const db = require('../config/db');

const getLessonsByLanguage = async (req, res) => {
  try {
    const { languageId } = req.params;

    const [lessons] = await db.execute(
      'SELECT * FROM lessons WHERE language_id = ? ORDER BY order_number ASC',
      [languageId]
    );

    return res.status(200).json({
      success: true,
      lessons,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch lessons.',
      error: error.message,
    });
  }
};

const getLessonById = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const [lessons] = await db.execute(
      'SELECT * FROM lessons WHERE id = ?',
      [lessonId]
    );

    if (lessons.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    return res.status(200).json({
      success: true,
      lesson: lessons[0],
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch lesson.',
      error: error.message,
    });
  }
};

module.exports = {
  getLessonsByLanguage,
  getLessonById,
};
