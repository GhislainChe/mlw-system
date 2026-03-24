const pool = require('../config/db');

const getProfile = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized.',
      });
    }

    const [[userRow]] = await pool.query(
      `
        SELECT id, full_name, email, role, COALESCE(current_streak, 0) AS current_streak
        FROM users
        WHERE id = ?
      `,
      [userId]
    );

    if (!userRow) {
      return res.status(404).json({
        success: false,
        message: 'User not found.',
      });
    }

    const [[pointsRow]] = await pool.query(
      `
        SELECT COALESCE(SUM(COALESCE(lessons.points, 10)), 0) AS total_points
        FROM progress
        JOIN lessons ON lessons.id = progress.lesson_id
        WHERE progress.user_id = ?
          AND progress.points_awarded = 1
      `,
      [userId]
    );

    const [[completedRow]] = await pool.query(
      `
        SELECT COUNT(*) AS completed_lessons
        FROM progress
        WHERE user_id = ?
          AND completed = 1
      `,
      [userId]
    );

    const [[summaryRow]] = await pool.query(
      `
        SELECT
          COUNT(DISTINCT lessons.language_id) AS languages_started,
          SUM(
            CASE
              WHEN progress.completed = 0 AND COALESCE(progress.progress_percent, 0) > 0 THEN 1
              ELSE 0
            END
          ) AS lessons_in_progress,
          SUM(CASE WHEN progress.completed = 1 THEN 1 ELSE 0 END) AS lessons_completed
        FROM progress
        JOIN lessons ON lessons.id = progress.lesson_id
        WHERE progress.user_id = ?
      `,
      [userId]
    );

    const [languageProgressRows] = await pool.query(
      `
        SELECT
          languages.id AS language_id,
          languages.name AS language_name,
          COUNT(lessons.id) AS total_lessons,
          COALESCE(SUM(CASE WHEN progress.completed = 1 THEN 1 ELSE 0 END), 0) AS completed_lessons,
          ROUND(
            COALESCE(
              SUM(
                CASE
                  WHEN progress.completed = 1 THEN 100
                  ELSE COALESCE(progress.progress_percent, 0)
                END
              ),
              0
            ) / NULLIF(COUNT(lessons.id), 0)
          ) AS progress_percent
        FROM languages
        JOIN lessons ON lessons.language_id = languages.id
        LEFT JOIN progress
          ON progress.lesson_id = lessons.id
         AND progress.user_id = ?
        WHERE languages.id IN (
          SELECT DISTINCT started_lessons.language_id
          FROM progress started_progress
          JOIN lessons started_lessons ON started_lessons.id = started_progress.lesson_id
          WHERE started_progress.user_id = ?
        )
        GROUP BY languages.id, languages.name
        ORDER BY languages.name ASC
      `,
      [userId, userId]
    );

    const [recentActivityRows] = await pool.query(
      `
        SELECT
          lessons.id AS lesson_id,
          lessons.title AS lesson_title,
          languages.name AS language_name,
          CASE
            WHEN progress.completed = 1 THEN 100
            ELSE COALESCE(progress.progress_percent, 0)
          END AS progress_percent,
          progress.completed,
          progress.updated_at
        FROM progress
        JOIN lessons ON lessons.id = progress.lesson_id
        JOIN languages ON languages.id = lessons.language_id
        WHERE progress.user_id = ?
        ORDER BY progress.updated_at DESC
        LIMIT 3
      `,
      [userId]
    );

    const [leaderboardRows] = await pool.query(
      `
        SELECT
          users.id AS user_id,
          COALESCE(SUM(
            CASE
              WHEN progress.points_awarded = 1 THEN COALESCE(lessons.points, 10)
              ELSE 0
            END
          ), 0) AS total_points,
          COALESCE(SUM(CASE WHEN progress.completed = 1 THEN 1 ELSE 0 END), 0) AS completed_lessons
        FROM users
        LEFT JOIN progress ON progress.user_id = users.id
        LEFT JOIN lessons ON lessons.id = progress.lesson_id
        GROUP BY users.id, users.full_name
        ORDER BY total_points DESC, completed_lessons DESC, users.full_name ASC
      `
    );

    const leaderboardRank =
      leaderboardRows.findIndex((entry) => Number(entry.user_id) === Number(userId)) + 1 || 0;

    return res.json({
      success: true,
      user: {
        id: userRow.id,
        full_name: userRow.full_name,
        email: userRow.email,
        role: userRow.role,
      },
      personal_stats: {
        total_points: Number(pointsRow?.total_points || 0),
        completed_lessons: Number(completedRow?.completed_lessons || 0),
        current_streak: Number(userRow.current_streak || 0),
        leaderboard_rank: leaderboardRank,
      },
      learning_summary: {
        languages_started: Number(summaryRow?.languages_started || 0),
        lessons_in_progress: Number(summaryRow?.lessons_in_progress || 0),
        lessons_completed: Number(summaryRow?.lessons_completed || 0),
      },
      progress_by_language: languageProgressRows.map((row) => ({
        language_id: row.language_id,
        language_name: row.language_name,
        total_lessons: Number(row.total_lessons || 0),
        completed_lessons: Number(row.completed_lessons || 0),
        progress_percent: Number(row.progress_percent || 0),
      })),
      recent_activity: recentActivityRows.map((row) => ({
        lesson_id: row.lesson_id,
        lesson_title: row.lesson_title,
        language_name: row.language_name,
        progress_percent: Number(row.progress_percent || 0),
        completed: Number(row.completed || 0),
        updated_at: row.updated_at,
      })),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to load profile right now.',
      error: error.message,
    });
  }
};

module.exports = {
  getProfile,
};
