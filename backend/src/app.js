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
  res.status(404).json({ error: 'Endpoint khong ton tai' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Loi server. Vui long thu lai.' });
});

app.listen(PORT, () => {
  console.log(`Server chay tai http://localhost:${PORT}`);
});
