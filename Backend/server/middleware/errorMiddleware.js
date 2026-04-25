export function notFound(req, res, next) {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
}

export function errorHandler(err, req, res, next) {
  // If headers already sent, delegate to default Express error handler
  if (res.headersSent) return next(err);

  let statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  let message = err.message || "Server Error";

  // Mongoose: bad ObjectId
  if (err.name === "CastError") {
    statusCode = 404;
    message = "Resource not found.";
  }

  // Mongoose: validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Mongo duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    const fields = Object.keys(err.keyValue || {}).join(", ");
    message = fields ? `Duplicate value for: ${fields}` : "Duplicate field value.";
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
}

