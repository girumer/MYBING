const BingoBord = require('../Models/BingoBord');

const updatePrize = async (req, res) => {
  const { username, prize } = req.body;

  if (!username || typeof prize !== 'number') {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const updatedUser = await BingoBord.findOneAndUpdate(
      { username },
      { $inc: { prize: prize } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      message: `Prize updated successfully. Total prize: ${updatedUser.prize}`,
      prize: updatedUser.prize,
    });
  } catch (err) {
    console.error('Prize update error:', err);
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { updatePrize };
