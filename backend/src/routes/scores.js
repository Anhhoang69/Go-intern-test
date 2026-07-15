const { Router } = require('express');
const { getScoreBySbd } = require('../controllers/scoreController');

const router = Router();

router.get('/:sbd', getScoreBySbd);

module.exports = router;
