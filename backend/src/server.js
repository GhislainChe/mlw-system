require('dotenv').config();

const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const languageRoutes = require('./routes/languageRoutes');
const lessonRoutes = require('./routes/lessonRoutes');

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/languages', languageRoutes);
app.use('/api/lessons', lessonRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'MLW backend is running.' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
