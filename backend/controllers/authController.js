require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const {secretkey,refreshKey}=require("../config/jwtconfig")

const BingoBord = require('../Models/BingoBord');

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log('JWT_SECRET:', process.env.JWT_SECRET);  // Should print your secret key
console.log('JWT_PRIVATE:', process.env.JwT_PRIVATE);  // Should print your private ke
  
  try {
    const existingUser = await BingoBord.findOne({ username });

    if (!existingUser) {
      return res.json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (!isPasswordValid) {
       
      return res.json({ message: "Invalid password" });
    }
    if (existingUser.Wallet < 50) {
      return res.json({ message: "Insufficient balance" });
    }

     const role=existingUser.role;
    const accessToken = jwt.sign({ username,role:existingUser.role }, secretkey, { expiresIn: '1d' });
    const refreshToken = jwt.sign({ username }, refreshKey, { expiresIn: '30d' });

    res.cookie('accesstoken', accessToken, {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: false,
      secure: false,
      sameSite: 'strict',
    });
 
    res.json({
      message: 'Login successful',
      token: accessToken,  // Include the token in the response
      Admin: existingUser.role === 'admin',
    });
   
  } catch (e) {
    console.error('Login error:', e);
    res.json({ message: "Error during login" });
  }
};

module.exports = { loginUser };
