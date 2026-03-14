const db = require('../config/db');

const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const [streakRows] = await db.execute(
      'SELECT current_streak FROM users WHERE id = ?',
      [userId]
    );

    const [pointsRows] = await db.execute(
      'SELECT SUM(points) AS points FROM progress WHERE user_id = ?',
      [userId]
    );

    const [completedRows] = await db.execute(
      'SELECT COUNT(*) AS completed FROM progress WHERE user_id = ? AND completed = 1',
      [userId]
    );

    const [rankRows] = await db.execute(
      `SELECT COUNT(*) + 1 AS rank
       FROM (
         SELECT user_id, SUM(points) AS total
         FROM progress
         GROUP BY user_id
       ) leaderboard
       WHERE total > (
         SELECT SUM(points) FROM progress WHERE user_id = ?
       )`,
      [userId]
    );

    return res.status(200).json({
      streak: streakRows[0]?.current_streak || 0,
      points: pointsRows[0]?.points || 0,
      completedLessons: completedRows[0]?.completed || 0,
      rank: rankRows[0]?.rank || 1,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to fetch dashboard stats.',
      error: error.message,
    });
  }
};

module.exports = {
  getDashboardStats,
};
