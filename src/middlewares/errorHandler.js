const errorHandler = (err, req, res, next) => {
    console.error("Error:", err.message);
  
    // Set status code
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  
    res.status(statusCode).json({
      message: err.message || "Internal Server Error",
      stack: process.env.NODE_ENV === "development" ? err.stack : null, // Show stack trace only in development mode
    });
  };
  
  export default errorHandler;
  