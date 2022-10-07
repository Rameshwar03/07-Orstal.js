const AppError = require("../utils/newAppError");

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  // if (err.isOprational) {
  //   res.status(err.statusCode).sendFile(__dirname, "/static/404.html");
  // }
  // else{

  // }
  res.status(err.statusCode).render("error", {
    title: `Error ${err.statusCode}`,
  });
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    sendErrorProd(error, res);
  }
};
