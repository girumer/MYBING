const reportController = async (req, res) => {
  const player = req.player;
  const gameHistory = player.gameHistory || [];
  const prizeHistory = Array.isArray(player.prize) ? player.prize : [];

  if (!gameHistory.length && !prizeHistory.length) {
    return res.status(404).json({ message: 'No data found for this player' });
  }

  try {
    const now = new Date();

    const startOfToday = new Date(now);
    startOfToday.setHours(0, 0, 0, 0);

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const getAmount = (entry) => {
      if (typeof entry === 'number') return entry;
      if (typeof entry.prize === 'number') return entry.prize;
      if (typeof entry.amount === 'number') return entry.amount;
      return 0;
    };

    const filterByDate = (entries, startDate) => {
      return entries.filter(entry => {
        const timestamp = entry?.timestamp ? new Date(entry.timestamp) : null;
        return timestamp && timestamp >= startDate && timestamp <= now;
      });
    };

    const calculate = (games, prizes, startDate, label) => {
      const totalGames = games.length;
      const totalProfit = games.reduce((sum, game) => sum + (game.profit || 0), 0);
      const totalBonus = prizes.reduce((sum, entry) => sum + getAmount(entry), 0);

      return {
        period: label,
        startDate,
        endDate: now,
        totalGames,
        totalProfit,
        totalBonus
      };
    };

    const dailyStats = calculate(
      filterByDate(gameHistory, startOfToday),
      filterByDate(prizeHistory, startOfToday),
      startOfToday,
      'daily'
    );

    const weeklyStats = calculate(
      filterByDate(gameHistory, startOfWeek),
      filterByDate(prizeHistory, startOfWeek),
      startOfWeek,
      'weekly'
    );

    const monthlyStats = calculate(
      filterByDate(gameHistory, startOfMonth),
      filterByDate(prizeHistory, startOfMonth),
      startOfMonth,
      'monthly'
    );

    // Log reports to the console
    console.log('--- Player Report ---');
    console.log('Daily Stats:', dailyStats);
    console.log('Weekly Stats:', weeklyStats);
    console.log('Monthly Stats:', monthlyStats);
    console.log('---------------------');

    // Send response
    res.json({
      daily: dailyStats,
      weekly: weeklyStats,
      monthly: monthlyStats,
    });

  } catch (error) {
    console.error('Error generating report:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = reportController;
