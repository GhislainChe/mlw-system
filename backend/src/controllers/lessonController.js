const db = require('../config/db');

const getLessonsByLanguage = async (req, res) => {
  try {
    const { languageId } = req.params;

    const [lessons] = await db.execute(
      'SELECT * FROM lessons WHERE language_id = ? ORDER BY id ASC',
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

module.exports = {
  getLessonsByLanguage,
};
