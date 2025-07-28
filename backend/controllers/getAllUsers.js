// controllers/userController.js
const BingoBord = require('../Models/BingoBord'); // Assuming your BingoBord model is here

const getAllUsers = async (req, res) => {
  try {
    const users = await BingoBord.find({});
    console.log("All users are:", users);
    return res.json({ valid: true, user: users });
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ valid: false, message: "Error fetching users" });
  }
};

module.exports = { getAllUsers };
