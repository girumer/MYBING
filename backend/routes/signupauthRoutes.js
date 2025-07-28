const express = require('express');
const { registerUser } = require('../controllers/signupauthController');
const { validateSignupInput } = require('../middleware/signupauthMiddleware');

const router = express.Router();

// Signup route
router.post('/register', validateSignupInput, registerUser);

module.exports = router;
