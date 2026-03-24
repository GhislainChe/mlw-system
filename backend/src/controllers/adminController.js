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

const getAdminLessons = async (req, res) => {
  try {
    const [lessons] = await pool.query(
      `
        SELECT
          lessons.id,
          lessons.language_id,
          languages.name AS language_name,
          lessons.title,
          lessons.content,
          lessons.order_number,
          COALESCE(lessons.points, 10) AS points,
          lessons.is_pro,
          lessons.created_at
        FROM lessons
        JOIN languages ON languages.id = lessons.language_id
        ORDER BY languages.name ASC, lessons.order_number ASC, lessons.id ASC
      `
    );

    return res.json({
      success: true,
      lessons: lessons.map((lesson) => ({
        ...lesson,
        order_number: Number(lesson.order_number || 0),
        points: Number(lesson.points || 10),
        is_pro: Number(lesson.is_pro || 0),
      })),
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to load lessons right now.',
      error: error.message,
    });
  }
};

const getAdminUsers = async (req, res) => {
  try {
    const [users] = await pool.query(
      `
        SELECT id, full_name, email, role, created_at
        FROM users
        ORDER BY created_at DESC
      `
    );

    return res.json({
      success: true,
      users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to load users right now.',
      error: error.message,
    });
  }
};

const getNextLessonOrderNumber = async (req, res) => {
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

    const [[orderRow]] = await pool.query(
      'SELECT COALESCE(MAX(order_number), 0) AS max_order_number FROM lessons WHERE language_id = ?',
      [languageId]
    );

    return res.json({
      success: true,
      nextOrderNumber: Number(orderRow?.max_order_number || 0) + 1,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to determine the next lesson order right now.',
      error: error.message,
    });
  }
};

const createAdminLesson = async (req, res) => {
  try {
    const { language_id, title, content, order_number, points, is_pro } = req.body;

    if (!language_id || !title?.trim() || !content?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'language_id, title, and content are required.',
      });
    }

    const [languageRows] = await pool.query('SELECT id FROM languages WHERE id = ? LIMIT 1', [
      language_id,
    ]);

    if (languageRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Selected language was not found.',
      });
    }

    const [result] = await pool.query(
      `
        INSERT INTO lessons (language_id, title, content, order_number, points, is_pro)
        VALUES (?, ?, ?, ?, ?, ?)
      `,
      [
        language_id,
        title.trim(),
        content.trim(),
        Number(order_number) || 1,
        Number(points) || 10,
        Number(is_pro) === 1 ? 1 : 0,
      ]
    );

    return res.status(201).json({
      success: true,
      message: 'Lesson created successfully.',
      lesson: {
        id: result.insertId,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to create lesson right now.',
      error: error.message,
    });
  }
};

const updateAdminLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;
    const { language_id, title, content, order_number, points, is_pro } = req.body;

    if (!language_id || !title?.trim() || !content?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'language_id, title, and content are required.',
      });
    }

    const [lessonRows] = await pool.query('SELECT id FROM lessons WHERE id = ? LIMIT 1', [
      lessonId,
    ]);

    if (lessonRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found.',
      });
    }

    const [languageRows] = await pool.query('SELECT id FROM languages WHERE id = ? LIMIT 1', [
      language_id,
    ]);

    if (languageRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Selected language was not found.',
      });
    }

    await pool.query(
      `
        UPDATE lessons
        SET language_id = ?, title = ?, content = ?, order_number = ?, points = ?, is_pro = ?
        WHERE id = ?
      `,
      [
        language_id,
        title.trim(),
        content.trim(),
        Number(order_number) || 1,
        Number(points) || 10,
        Number(is_pro) === 1 ? 1 : 0,
        lessonId,
      ]
    );

    return res.json({
      success: true,
      message: 'Lesson updated successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to update lesson right now.',
      error: error.message,
    });
  }
};

const deleteAdminLesson = async (req, res) => {
  try {
    const { lessonId } = req.params;

    const [lessonRows] = await pool.query('SELECT id FROM lessons WHERE id = ? LIMIT 1', [
      lessonId,
    ]);

    if (lessonRows.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'Lesson not found.',
      });
    }

    const [[progressCountRow]] = await pool.query(
      'SELECT COUNT(*) AS progress_count FROM progress WHERE lesson_id = ?',
      [lessonId]
    );

    if (Number(progressCountRow?.progress_count || 0) > 0) {
      return res.status(400).json({
        success: false,
        message: 'This lesson cannot be deleted because learner progress already exists for it.',
      });
    }

    await pool.query('DELETE FROM lessons WHERE id = ?', [lessonId]);

    return res.json({
      success: true,
      message: 'Lesson deleted successfully.',
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Unable to delete lesson right now.',
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
  getAdminLessons,
  getAdminUsers,
  getNextLessonOrderNumber,
  createAdminLesson,
  updateAdminLesson,
  deleteAdminLesson,
};
