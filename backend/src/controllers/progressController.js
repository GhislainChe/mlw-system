const db = require('../config/db');

const markLessonCompleted = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const userId = req.user.id;

    await db.execute(
      'INSERT INTO progress (user_id, lesson_id, completed, completed_at) VALUES (?, ?, true, NOW())',
      [userId, lessonId]
    );

    return res.status(201).json({
      success: true,
      message: 'Lesson marked as completed',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to mark lesson as completed.',
      error: error.message,
    });
  }
};

const getUserProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const [progress] = await db.execute(
      'SELECT * FROM progress WHERE user_id = ?',
      [userId]
    );

    return res.status(200).json({
      success: true,
      progress,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch user progress.',
      error: error.message,
    });
  }
};

module.exports = {
  markLessonCompleted,
  getUserProgress,
};
