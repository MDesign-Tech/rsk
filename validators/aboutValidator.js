const { body } = require('express-validator');


const validateAbout = [

  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .trim(),


  body('description')
    .notEmpty()
    .withMessage('Description is required')
    .trim(),


  body('stats')
    .optional()
    .isArray()
    .withMessage('Stats must be array'),


  body('contactMethods')
    .optional()
    .isArray()
    .withMessage('Contact methods must be array'),


];


module.exports = {
  validateAbout,
};