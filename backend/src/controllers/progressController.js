const db = require('../config/db');

const markLessonCompleted = async (req, res) => {
  try {
    const lessonId = req.params.lessonId || req.body.lessonId || req.body.lesson_id;
    const userId = req.user.id;
    const rawProgressPercent = req.body.progressPercent ?? req.body.progress_percent;
    const normalizedProgressPercent =
      rawProgressPercent === undefined || rawProgressPercent === null
        ? null
        : Math.max(0, Math.min(100, Number(rawProgressPercent) || 0));
    const shouldComplete =
      req.body.completed === true ||
      req.body.completed === 1 ||
      req.body.completed === '1' ||
      req.body.completed === 'true' ||
      normalizedProgressPercent === 100 ||
      (!Object.prototype.hasOwnProperty.call(req.body, 'completed') &&
        normalizedProgressPercent === null);

    if (!lessonId) {
      return res.status(400).json({
        success: false,
        message: 'lessonId is required',
      });
    }

    const [lessonRows] = await db.execute(
      `SELECT IFNULL(points, 10) AS lesson_points
       FROM lessons
       WHERE id = ?
       LIMIT 1`,
      [lessonId]
    );

    if (!lessonRows.length) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found',
      });
    }

    const pointsValue = Math.max(0, Number(lessonRows[0].lesson_points) || 10);

    let [existingRows] = await db.execute(
      `SELECT id, points, completed, progress_percent, points_awarded
       FROM progress
       WHERE user_id = ? AND lesson_id = ?
       LIMIT 1`,
      [userId, lessonId]
    );

    if (!existingRows.length) {
      await db.execute(
        `INSERT INTO progress (
          user_id,
          lesson_id,
          progress_percent,
          completed,
          points,
          points_awarded,
          completed_at
        ) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
          userId,
          lessonId,
          normalizedProgressPercent || 0,
          0,
          0,
          0,
          null,
        ]
      );

      [existingRows] = await db.execute(
        `SELECT id, points, completed, progress_percent, points_awarded
         FROM progress
         WHERE user_id = ? AND lesson_id = ?
         LIMIT 1`,
        [userId, lessonId]
      );
    }

    const existingProgress = existingRows[0];

    if (shouldComplete) {
      if (Number(existingProgress.completed) === 1) {
        return res.status(200).json({
          success: true,
          message: 'Progress updated',
        });
      }

      const awardPoints = Number(existingProgress.points_awarded) === 0 && pointsValue > 0;

      await db.execute(
        `UPDATE progress
         SET completed = 1,
             progress_percent = 100,
             completed_at = NOW(),
             points = CASE
               WHEN points_awarded = 0 THEN ?
               ELSE points
             END,
             points_awarded = CASE
               WHEN points_awarded = 0 AND ? > 0 THEN 1
               ELSE points_awarded
             END
         WHERE id = ?`,
        [awardPoints ? pointsValue : 0, pointsValue, existingProgress.id]
      );

      return res.status(200).json({
        success: true,
        message: 'Progress updated',
      });
    }

    const progressPercent =
      normalizedProgressPercent === null
        ? Number(existingProgress.progress_percent) || 0
        : normalizedProgressPercent;

    await db.execute(
      `UPDATE progress
       SET progress_percent = ?
       WHERE id = ?`,
      [progressPercent, existingProgress.id]
    );

    return res.status(200).json({
      success: true,
      message: 'Progress updated',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update progress',
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
        progress.completed,
        progress.progress_percent
      FROM progress
      JOIN lessons ON lessons.id = progress.lesson_id
      JOIN languages ON languages.id = lessons.language_id
      WHERE progress.user_id = ?
      ORDER BY progress.updated_at DESC
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
      progress_percent: Number(recent.progress_percent) || (Number(recent.completed) === 1 ? 100 : 0),
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
