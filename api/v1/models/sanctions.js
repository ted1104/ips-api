"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sanctions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.MissionsModel, {
        foreignKey: "missionId",
        as: "sanction_proposee",
      });
    }
  }
  Sanctions.init(
    {
      missionId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      created_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SanctionsModel",
      tableName: "sanctions",
    }
  );
  return Sanctions;
};
