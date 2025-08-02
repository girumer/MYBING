const express = require('express');
const router = express.Router();
const { updatePrize } = require('../controllers/updatePrizeController');

// POST /api/updatePrize
router.post('/updatePrize', updatePrize);

module.exports = router;
