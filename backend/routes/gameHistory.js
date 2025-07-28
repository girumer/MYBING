// routes/gameHistory.js
const express = require('express');
const router = express.Router();
const cheplayerforhistory = require('../middleware/cheplayerforhistory');
const gameHistoryController = require('../controllers/gameHistoryController');

router.post('/getHistory', cheplayerforhistory, gameHistoryController);

module.exports = router;
