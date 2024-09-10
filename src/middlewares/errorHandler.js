const errorHandler = (err, req, res, next) => {
  res.status(err.status || 500).json({
    status: err.status || 500,
    message: 'Something went wrong',
    error: err.message,
  });
};

export default errorHandler;
