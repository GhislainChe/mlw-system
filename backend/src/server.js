require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const languageRoutes = require('./routes/languageRoutes');
const lessonRoutes = require('./routes/lessonRoutes');
const progressRoutes = require('./routes/progressRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const profileRoutes = require('./routes/profileRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api', lessonRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'MLW backend is running.' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
