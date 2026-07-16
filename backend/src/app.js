require('dotenv').config();
const express = require('express');
const cors = require('cors');

const scoreRoutes  = require('./routes/scores');
const reportRoutes = require('./routes/reports');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/scores',  scoreRoutes);
app.use('/api/reports', reportRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error. Please try again.' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);

  const { getScoreStats, getTop10GroupA } = require('./services/reportService');
  console.log('Warming up report cache...');
  Promise.all([getScoreStats(), getTop10GroupA()])
    .then(() => console.log('Report cache ready.'))
    .catch((e) => console.error('Cache warmup failed:', e.message));
});

