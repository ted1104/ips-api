const { StatusCodes } = require("http-status-codes");

const errorHandler = (err, req, res, next) => {
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "false",
    msg: "Something went wrong! Try again later !!",
  });
};

module.exports = errorHandler;
