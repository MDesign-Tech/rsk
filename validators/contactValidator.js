const { body } = require('express-validator');

const validateContact = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .trim(),
  body('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('message')
    .notEmpty().withMessage('Message is required')
    .trim(),
];

module.exports = { validateContact };
  