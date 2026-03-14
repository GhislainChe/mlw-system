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

const getRecentProgress = async (req, res) => {
  try {
    const userId = req.user.id;
    const [rows] = await db.execute(
      `SELECT
        lessons.id AS lesson_id,
        lessons.title AS lesson_title,
        languages.id AS language_id,
        languages.name AS language_name,
        progress.points,
        progress.completed
      FROM progress
      JOIN lessons ON lessons.id = progress.lesson_id
      JOIN languages ON languages.id = lessons.language_id
      WHERE progress.user_id = ?
      ORDER BY progress.completed_at DESC
      LIMIT 1`,
      [userId]
    );

    if (!rows.length) {
      return res.status(200).json({
        lesson_id: null,
        lesson_title: null,
        language_id: null,
        language_name: null,
        progress_percent: 0,
      });
    }

    const recent = rows[0];

    return res.status(200).json({
      lesson_id: recent.lesson_id,
      lesson_title: recent.lesson_title,
      language_id: recent.language_id,
      language_name: recent.language_name,
      progress_percent: Number(recent.completed) === 1 ? 100 : 50,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch recent lesson progress.',
      error: error.message,
    });
  }
};

module.exports = {
  markLessonCompleted,
  getUserProgress,
  getRecentProgress,
};
