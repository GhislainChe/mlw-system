const db = require('../config/db');

const getLeaderboard = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT
         users.id AS user_id,
         users.full_name,
         COALESCE(SUM(
           CASE
             WHEN progress.points_awarded = 1 THEN COALESCE(lessons.points, 10)
             ELSE 0
           END
         ), 0) AS total_points,
         COALESCE(SUM(
           CASE
             WHEN progress.completed = 1 THEN 1
             ELSE 0
           END
         ), 0) AS completed_lessons
       FROM users
       LEFT JOIN progress ON users.id = progress.user_id
       LEFT JOIN lessons ON lessons.id = progress.lesson_id
       GROUP BY users.id, users.full_name
       ORDER BY total_points DESC, completed_lessons DESC, users.full_name ASC`
    );

    const leaderboard = rows.map((row, index) => ({
      ...row,
      rank: index + 1,
    }));

    return res.status(200).json({
      success: true,
      leaderboard,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch leaderboard.',
      error: error.message,
    });
  }
};

module.exports = {
  getLeaderboard,
};
