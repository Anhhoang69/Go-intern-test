const { getScoreStats, getTop10GroupA } = require('../services/reportService');

async function getStats(req, res) {
  const data = await getScoreStats();
  return res.json(data);
}

async function getTop10(req, res) {
  const data = await getTop10GroupA();
  return res.json(data);
}

module.exports = { getStats, getTop10 };
