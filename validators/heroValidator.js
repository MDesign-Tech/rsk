const { body } = require('express-validator');

const validateHero = [
  body('title')
    .notEmpty().withMessage('Title is required')
    .trim(),
  body('subtitle')
    .notEmpty().withMessage('Subtitle is required')
    .trim(),
  body('trust')
    .optional()
    .trim(),
];

module.exports = { validateHero };
