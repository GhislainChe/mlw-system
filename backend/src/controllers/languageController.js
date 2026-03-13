const db = require('../config/db');

const getLanguages = async (req, res) => {
  try {
    const [languages] = await db.execute(
      'SELECT * FROM languages ORDER BY id ASC'
    );

    return res.status(200).json({
      success: true,
      languages,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch languages.',
      error: error.message,
    });
  }
};

module.exports = {
  getLanguages,
};
