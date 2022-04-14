const { StatusCodes } = require("http-status-codes");
const Ok = (res, data) => {
  res.status(StatusCodes.OK).json({
    status: "success",
    data,
  });
};
const Created = (res, data, msg) => {
  res.status(StatusCodes.CREATED).json({
    status: "success",
    msg,
    data,
  });
};

module.exports = { Ok, Created };
