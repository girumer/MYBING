// controllers/gameHistoryController.js
const gameHistoryController = (req, res) => {
    const player = req.player;  // The player data is already attached by the middleware
    const gameHistory = player.gameHistory || [];  // Get the game history (or empty array if undefined)
  
    console.log('Player game history:', gameHistory);
    res.json(gameHistory);  // Respond with the player's game history
  };
  
  module.exports = gameHistoryController;
  