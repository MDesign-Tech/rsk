const { body } = require('express-validator');

const validateLogin = [
  body('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('password')
    .notEmpty().withMessage('Password is required'),
];

const validateForgotPassword = [
  body('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
];

const validateVerifyOTP = [
  body('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('otp')
    .notEmpty().withMessage('OTP is required')
    .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
];

const validateResendOTP = [
  body('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
];

const validateResetPassword = [
  body('email')
    .isEmail().withMessage('Please enter a valid email')
    .normalizeEmail(),
  body('otp')
    .notEmpty().withMessage('OTP is required')
    .isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits'),
  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
];

module.exports = {
  validateLogin,
  validateForgotPassword,
  validateVerifyOTP,
  validateResendOTP,
  validateResetPassword,
};
