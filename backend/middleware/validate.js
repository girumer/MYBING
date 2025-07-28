const { body, validationResult } = require('express-validator');

const validateRegistration = [
  body('username').isLength({ min: 3 }).trim().escape(),
  body('password').isLength({ min: 6 }),

];

const validateLogin = [
  body('username').trim().notEmpty().withMessage('Username is required'),
  body('password').trim().notEmpty().withMessage('Password is required'),
];

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
