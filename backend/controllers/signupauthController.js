const bcrypt = require('bcryptjs');
const BingoBord = require('../Models/BingoBord');

const registerUser = async (req, res) => {
  const { username, password, role,amount } = req.body;

  try {
    // Check if user already exists
    const existingUser = await BingoBord.findOne({ username });
    if (existingUser) {
      return res.json({ message: "exist" });
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new BingoBord({
      username,
      password: hashedPassword,
      role,
      Wallet:amount,
    });

    await newUser.save();
    console.log("User registered successfully");
    res.json({ message: "successful" });
  } catch (error) {
    console.error("Error during user registration:", error);
    res.status(500).json({ message: "fail" });
  }
};

module.exports = { registerUser };
