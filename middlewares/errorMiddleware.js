import AppError from '../utils/appError.js';

// Error handling middleware
const errorMiddleware = (err, req, res, next) => {
  // Log the error

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Handle other types of errors
  res.status(err.statusCode || 500).json({
    status: "error",
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { error: err.stack }),
  });
};

export default errorMiddleware;
