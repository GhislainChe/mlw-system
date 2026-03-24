const pool = require('../config/db');

const getAdminDashboard = async (req, res) => {
  try {
    const [[usersRow]] = await pool.query('SELECT COUNT(*) AS total_users FROM users');
    const [[languagesRow]] = await pool.query('SELECT COUNT(*) AS total_languages FROM languages');
    const [[lessonsRow]] = await pool.query('SELECT COUNT(*) AS total_lessons FROM lessons');
    const [[progressRow]] = await pool.query(
      'SELECT COUNT(*) AS total_completed_lessons FROM progress WHERE completed = 1'
    );

    const [recentUsersRows] = await pool.query(
      `
        SELECT id, full_name, email, role, created_at
        FROM users
        ORDER BY created_at DESC
        LIMIT 5
      `
    );

    const [recentActivityRows] = await pool.query(
      `
        SELECT
          users.full_name AS user_name,
          lessons.title AS lesson_title,
          languages.name AS language_name,
          progress.progress_percent,
          progress.completed,
          progress.updated_at
        FROM progress
        JOIN users ON users.id = progress.user_id
        JOIN lessons ON lessons.id = progress.lesson_id
        JOIN languages ON languages.id = lessons.language_id
        ORDER BY progress.updated_at DESC
        LIMIT 5
      `
    );

    return res.json({
      success: true,
      total_users: Number(usersRow?.total_users || 0),
      total_languages: Number(languagesRow?.total_languages || 0),
      total_lessons: Number(lessonsRow?.total_lessons || 0),
      total_completed_lessons: Number(progressRow?.total_completed_lessons || 0),
      recent_users: recentUsersRows,
      recent_activity: recentActivityRows.map((row) => ({
        user_name: row.user_name,
        lesson_title: row.lesson_title,
        language_name: row.language_name,
        progress_percent: Number(row.completed) === 1 ? 100 : Number(row.progress_percent || 0),
        completed: Number(row.completed || 0),
        updated_at: row.updated_at,
      })),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to load admin dashboard summary.',
      error: error.message,
    });
  }
};

const getAdminLanguages = async (req, res) => {
  try {
    const [languages] = await pool.query(
      `
        SELECT
          languages.id,
          languages.name,
          languages.description,
          languages.image_url,
          COUNT(lessons.id) AS lesson_count
        FROM languages
        LEFT JOIN lessons ON lessons.language_id = languages.id
        GROUP BY languages.id, languages.name, languages.description, languages.image_url
        ORDER BY languages.name ASC
      `
    );

    return res.json({
      success: true,
      languages: languages.map((language) => ({
        ...language,
        lesson_count: Number(language.lesson_count || 0),
      })),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to load languages right now.',
      error: error.message,
    });
  }
};

const createAdminLanguage = async (req, res) => {
  try {
    const { name, description, image_url } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Language name is required.',
      });
    }

    const [existingRows] = await pool.query(
      'SELECT id FROM languages WHERE LOWER(name) = LOWER(?) LIMIT 1',
      [name.trim()]
    );

    if (existingRows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'A language with this name already exists.',
      });
    }

    const [result] = await pool.query(
      `
        INSERT INTO languages (name, description, image_url)
        VALUES (?, ?, ?)
      `,
      [name.trim(), description?.trim() || '', image_url?.trim() || '']
    );

    return res.status(201).json({
      success: true,
      message: 'Language created successfully.',
      language: {
        id: result.insertId,
        name: name.trim(),
        description: description?.trim() || '',
        image_url: image_url?.trim() || '',
        lesson_count: 0,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to create language right now.',
      error: error.message,
    });
  }
};

const updateAdminLanguage = async (req, res) => {
  try {
    const { languageId } = req.params;
    const { name, description, image_url } = req.body;

    if (!name?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Language name is required.',
      });
    }

    const [languageRows] = await pool.query('SELECT id FROM languages WHERE id = ? LIMIT 1', [
      languageId,
    ]);

    if (languageRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Language not found.',
      });
    }

    const [existingRows] = await pool.query(
      'SELECT id FROM languages WHERE LOWER(name) = LOWER(?) AND id <> ? LIMIT 1',
      [name.trim(), languageId]
    );

    if (existingRows.length > 0) {
      return res.status(409).json({
        success: false,
        message: 'Another language with this name already exists.',
      });
    }

    await pool.query(
      `
        UPDATE languages
        SET name = ?, description = ?, image_url = ?
        WHERE id = ?
      `,
      [name.trim(), description?.trim() || '', image_url?.trim() || '', languageId]
    );

    return res.json({
      success: true,
      message: 'Language updated successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to update language right now.',
      error: error.message,
    });
  }
};

const deleteAdminLanguage = async (req, res) => {
  try {
    const { languageId } = req.params;

    const [languageRows] = await pool.query('SELECT id FROM languages WHERE id = ? LIMIT 1', [
      languageId,
    ]);

    if (languageRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Language not found.',
      });
    }

    const [[lessonCountRow]] = await pool.query(
      'SELECT COUNT(*) AS lesson_count FROM lessons WHERE language_id = ?',
      [languageId]
    );

    if (Number(lessonCountRow?.lesson_count || 0) > 0) {
      return res.status(400).json({
        success: false,
        message: 'This language cannot be deleted because lessons are linked to it.',
      });
    }

    await pool.query('DELETE FROM languages WHERE id = ?', [languageId]);

    return res.json({
      success: true,
      message: 'Language deleted successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to delete language right now.',
      error: error.message,
    });
  }
};

module.exports = {
  getAdminDashboard,
  getAdminLanguages,
  createAdminLanguage,
  updateAdminLanguage,
  deleteAdminLanguage,
};
