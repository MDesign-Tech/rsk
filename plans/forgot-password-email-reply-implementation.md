# Forgot Password, Email Service & Contact Reply Implementation Plan

## Project Architecture Analysis

The project follows a standard Express.js MVC pattern:
- **Models**: Mongoose schemas in `/models`
- **Controllers**: Route handlers in `/controllers`
- **Routes**: Express routers in `/routes`
- **Validators**: express-validator chains in `/validators`
- **Middleware**: Auth, error handling in `/middleware`
- **Config**: Database connection in `/config`
- **Response format**: `{ success, message, data/errors }`
- **Auth**: JWT-based with httpOnly cookies, `protect` middleware
- **Error handling**: Centralized in `errorHandler.js`

---

## Implementation Plan

### 1. Dependencies
Add to `package.json`:
- `nodemailer` - for sending emails via Gmail SMTP
- `express-rate-limit` - for rate limiting OTP requests

### 2. New Files to Create

#### `src/utils/emailService.js`
Reusable email service using Gmail SMTP.
- `sendOTPEmail(to, otp)` - sends OTP with HTML template
- `sendReplyEmail(to, subject, message)` - sends reply with HTML template
- Credentials from `GMAIL_USER` and `GMAIL_APP_PASSWORD` env vars only

#### `models/PasswordReset.js`
Mongoose schema for OTP storage:
- `email` (String, required, indexed)
- `otp` (String, required) - **hashed with bcrypt before save**
- `expiresAt` (Date, required)
- `isVerified` (Boolean, default: false)
- Timestamps

#### `middleware/rateLimit.js`
Rate limiting middleware for OTP endpoints:
- 3 requests per 15 minutes per IP for forgot-password/resend-otp

### 3. Files to Modify

#### `validators/authValidator.js`
Add new validator chains:
- `validateForgotPassword` - email validation
- `validateVerifyOTP` - email + otp validation
- `validateResetPassword` - email + otp + password validation
- `validateResendOTP` - email validation

#### `controllers/authController.js`
Add new controller methods:
- `forgotPassword` - generate 6-digit OTP, hash with bcrypt, save with 10min expiry
- `verifyOTP` - compare OTP, mark as verified
- `resendOTP` - invalidate previous, generate new OTP
- `resetPassword` - verify OTP is valid and verified, hash new password, clear OTP data

#### `controllers/contactController.js`
Add new controller method:
- `replyToMessage` - find message, send email reply, save reply data, update status to 'replied'

#### `routes/authRoutes.js`
Add new routes:
- `POST /forgot-password` → `forgotPassword`
- `POST /verify-otp` → `verifyOTP`
- `POST /resend-otp` → `resendOTP`
- `POST /reset-password` → `resetPassword`

#### `routes/contactRoutes.js`
Add new route:
- `POST /:id/reply` → `replyToMessage` (protected)

#### `models/ContactMessage.js`
Add new fields:
- `reply` (String)
- `replyAt` (Date)
- `repliedBy` (String)
- `status` (String, enum: ['pending', 'replied'], default: 'pending')

#### `.env.example`
Already has Gmail config, ensure it's correct.

---

## Implementation Order

1. Install dependencies (`nodemailer`, `express-rate-limit`)
2. Create `src/utils/emailService.js`
3. Create `models/PasswordReset.js`
4. Create `middleware/rateLimit.js`
5. Update `validators/authValidator.js`
6. Update `controllers/authController.js`
7. Update `controllers/contactController.js`
8. Update `routes/authRoutes.js`
9. Update `routes/contactRoutes.js`
10. Update `models/ContactMessage.js`
11. Test all endpoints

---

## Security Considerations

- OTP hashed with bcrypt before database storage
- OTP expires after 10 minutes
- OTP can only be used once (isVerified flag)
- Rate limiting: 3 OTP requests per 15 minutes per IP
- Resend invalidates previous OTP
- Password reset only works after OTP verification
- New password hashed with bcrypt
- OTP data cleared after successful reset
- All inputs validated with express-validator
- Errors handled by existing errorHandler middleware
- No sensitive data exposed in responses
