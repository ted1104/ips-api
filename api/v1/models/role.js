"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.RoleModel.hasOne(models.AuthModel);
    }
  }
  Role.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RoleModel",
      tableName: "roles",
    }
  );
  return Role;
};
