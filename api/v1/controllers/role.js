const { RoleModel } = require("../models");
const getAllRoles = async (req, res) => {
  const roles = await RoleModel.findAll();

  res.status(201).json({
    status: "success",
    data: { roles },
  });
};

module.exports = {
  getAllRoles,
};
