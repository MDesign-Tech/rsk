const { body } = require('express-validator');

const validateFAQ = [
  body('question')
    .notEmpty().withMessage('Question is required')
    .trim(),
  body('answer')
    .notEmpty().withMessage('Answer is required')
    .trim(),
];

module.exports = { validateFAQ };
