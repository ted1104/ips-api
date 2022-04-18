"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Auth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.RoleModel, {
        foreignKey: "roleId",
        as: "role_id_detail",
      });
      this.belongsTo(models.AgentModel, {
        foreignKey: "agentId",
        as: "agent_id_detail",
      });
    }
  }
  Auth.init(
    {
      username: DataTypes.STRING,
      password: DataTypes.TEXT,
      agentId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
      actif: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "AuthModel",
      tableName: "auths",
    }
  );
  return Auth;
};
