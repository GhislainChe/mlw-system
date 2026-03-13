const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../config/db');

const registerUser = async (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({
        message: 'full_name, email, and password are required.',
      });
    }

    const [existingUsers] = await db.execute(
      'SELECT id FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    if (existingUsers.length > 0) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.execute(
      'INSERT INTO users (full_name, email, password) VALUES (?, ?, ?)',
      [full_name, email, hashedPassword]
    );

    return res.status(201).json({
      message: 'User registered successfully.',
      user: {
        id: result.insertId,
        full_name,
        email,
        role: 'user',
        plan: 'free',
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to register user.',
      error: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: 'email and password are required.',
      });
    }

    const [users] = await db.execute(
      'SELECT id, full_name, email, password, role, created_at FROM users WHERE email = ? LIMIT 1',
      [email]
    );

    if (users.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const user = users[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const token = await jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return res.status(200).json({
      message: 'Login successful.',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email,
        role: user.role,
        created_at: user.created_at,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Failed to log in user.',
      error: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
