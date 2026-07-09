const { body } = require('express-validator');

const validateService = [
  body('title')
    .notEmpty().withMessage('Service title is required')
    .trim(),
  body('description')
    .notEmpty().withMessage('Service description is required')
    .trim(),
];

module.exports = { validateService };
