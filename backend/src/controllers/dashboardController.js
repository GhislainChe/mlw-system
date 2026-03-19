const db = require('../config/db');

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [streakRows] = await db.execute(
      'SELECT current_streak FROM users WHERE id = ?',
      [userId]
    );

    const [pointsRows] = await db.execute(
      `SELECT IFNULL(SUM(IFNULL(lessons.points, 10)), 0) AS points
       FROM lessons
       JOIN progress ON lessons.id = progress.lesson_id
       WHERE progress.user_id = ?
         AND progress.points_awarded = 1`,
      [userId]
    );

    const [completedRows] = await db.execute(
      `SELECT COUNT(*) AS completed
       FROM progress
       WHERE user_id = ? AND completed = 1`,
      [userId]
    );

    const [rankRows] = await db.execute(
      `SELECT COUNT(*) + 1 AS user_rank
       FROM (
         SELECT progress.user_id, IFNULL(SUM(IFNULL(lessons.points, 10)), 0) AS total_points
         FROM progress
         JOIN lessons ON lessons.id = progress.lesson_id
         WHERE progress.points_awarded = 1
         GROUP BY progress.user_id
       ) leaderboard
       WHERE total_points > (
         SELECT IFNULL(SUM(IFNULL(lessons.points, 10)), 0)
         FROM lessons
         JOIN progress ON lessons.id = progress.lesson_id
         WHERE progress.user_id = ?
           AND progress.points_awarded = 1
       )`,
      [userId]
    );

    return res.status(200).json({
      streak: streakRows[0]?.current_streak || 0,
      points: pointsRows[0]?.points || 0,
      completedLessons: completedRows[0]?.completed || 0,
      rank: rankRows[0]?.user_rank || 1,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch dashboard stats.',
      error: error.message,
    });
  }
};

const getRecentLessons = async (req, res) => {
  try {
    const userId = req.user.id;

    const [lessons] = await db.execute(
      `SELECT
          lessons.*,
          progress.points,
          progress.progress_percent,
          progress.updated_at
       FROM progress
       JOIN lessons ON lessons.id = progress.lesson_id
       WHERE progress.user_id = ?
       ORDER BY progress.updated_at DESC
       LIMIT 5`,
      [userId]
    );

    return res.status(200).json(lessons);
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch recent lessons.',
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
  getRecentLessons,
};
