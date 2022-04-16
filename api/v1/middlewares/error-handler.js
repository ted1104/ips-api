const { StatusCodes } = require("http-status-codes");
const { CustomError } = require("../errors");

const errorHandler = (err, req, res, next) => {
  // console.log(err);
  if (err instanceof CustomError) {
    return res
      .status(err.statusCode)
      .json({ status: "false", msg: err.message });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    status: "false",
    msg: "Something went wrong! Try again later !!",
  });
};

module.exports = errorHandler;
