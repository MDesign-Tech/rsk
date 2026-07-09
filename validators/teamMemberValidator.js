const { body } = require('express-validator');

const validateTeamMember = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .trim(),
  body('title')
    .notEmpty().withMessage('Title is required')
    .trim(),
  body('bio')
    .optional()
    .trim(),
];

module.exports = { validateTeamMember };
