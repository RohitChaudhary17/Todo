import {ApiError} from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  // Check if the error is an instance of ApiError
  if (err instanceof ApiError) {
    // Send the statusCode and message directly to the client
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || [] // Optional: Send additional error details if needed
    });
  }

  // If it's not an ApiError (e.g., generic error), send a generic error response
  return res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
};

export default errorHandler;

