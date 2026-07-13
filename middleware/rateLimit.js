const rateLimit = require('express-rate-limit');

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: {
    success: false,
    message: 'Too many OTP requests, please try again after 15 minutes',
    errors: ['You have exceeded the maximum number of OTP requests. Please try again later.'],
  },
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = { otpLimiter };
