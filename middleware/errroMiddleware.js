const errorMiddleware = (err, req, res, next) => {
  console.error("Error:", err); // Log the error for debugging purposes
  
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500; // Use existing status code or default to 500
    res.status(statusCode).json({
      error: err.message || "An unexpected error occurred",
      stack: process.env.NODE_ENV === "production" ? undefined : err.stack, // Hide stack trace in production
    });
};
export default errorMiddleware