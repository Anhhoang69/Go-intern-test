const { Router } = require('express');
const { getStats, getTop10 } = require('../controllers/reportController');

const router = Router();

router.get('/stats', getStats);
router.get('/top10-group-a', getTop10);

module.exports = router;
