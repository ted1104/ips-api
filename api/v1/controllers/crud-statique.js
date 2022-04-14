const asyncWrapper = require("../middlewares/async");
const { StatusCodes } = require("http-status-codes");
const { BadRequest } = require("../errors");

const { RoleModel } = require("../models");

/* 
  ####### CRUD :===> ROLES ########
*/
const getAllRole = asyncWrapper(async (req, res) => {
  const roles = await RoleModel.findAll();
  res.status(StatusCodes.OK).json({
    status: "success",
    data: { roles },
  });
});

const getOneRole = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;

  const oneRole = await RoleModel.findOne({ raw: true, where: { id } });
  if (!oneRole) {
    // return next(new BadRequest("No role found"));
    throw new BadRequest("No data");
  }
  res.status(StatusCodes.OK).json({
    status: "success",
    data: { ...oneRole },
  });
});

module.exports = {
  getAllRole,
  getOneRole,
};
