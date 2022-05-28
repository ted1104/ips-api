"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Status extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ReunionsModel, {
        foreignKey: "typeReunionId",
        as: "type_reunion_detail_id",
      });
    }
  }
  Status.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TypeReunionsModel",
      tableName: "type_reunions",
    }
  );
  return Status;
};
