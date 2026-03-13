const db = require('../config/db');

const getLeaderboard = async (req, res) => {
  try {
    const [leaderboard] = await db.execute(
      'SELECT users.id, users.full_name, COUNT(progress.id) AS completed_lessons FROM users LEFT JOIN progress ON users.id = progress.user_id AND progress.completed = true GROUP BY users.id ORDER BY completed_lessons DESC LIMIT 10'
    );

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
