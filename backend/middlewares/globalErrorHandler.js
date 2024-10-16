function globalErrorHandler(error, req, res, next) {
  if (error.name === "ValidationError") {
    let errors = {};

    Object.keys(error.errors).forEach((key) => {
      errors[key] = error.errors[key].message;
    });

    return res.status(400).json(errors);
  }
  console.log(error);
  return res.status(500).json({ message: error.message, error });
}

module.exports = globalErrorHandler;
