const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  if (err.name === 'CastError') {
    const message = 'Resource not found';
    res.status(404).json({
      success: false,
      message,
      errors: [message],
    });
    return;
  }

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((val) => val.message);
    res.status(400).json({
      success: false,
      message: 'Validation Error',
      errors,
    });
    return;
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field} already exists`;
    res.status(400).json({
      success: false,
      message: 'Duplicate Field Error',
      errors: [message],
    });
    return;
  }

  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      success: false,
      message: 'Invalid token',
      errors: ['Invalid or expired token'],
    });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      success: false,
      message: 'Token expired',
      errors: ['Your session has expired. Please login again.'],
    });
    return;
  }

  console.error('Error Stack:', err.stack);

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Server Error',
    errors: process.env.NODE_ENV === 'production' ? ['Something went wrong'] : [err.message],
  });
};

module.exports = errorHandler;
