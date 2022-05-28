"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class structure extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.AgentModel, {
        foreignKey: "structureId",
        as: "structure_detail_id",
      });
      this.hasMany(models.MissionsModel, {
        foreignKey: "structureId",
        as: "structure_detail_mission_id",
      });
      this.hasMany(models.DocumentsModel, {
        foreignKey: "structureId",
        as: "structure_doc",
      });
    }
  }
  structure.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StructureModel",
      tableName: "structures",
    }
  );
  return structure;
};
