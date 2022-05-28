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
      this.hasMany(models.LigneBudgetairesModel, {
        foreignKey: "statusId",
        as: "status_ligne_detail_id",
      });
    }
  }
  Status.init(
    {
      description: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "StatusLignesModel",
      tableName: "status_lignebudgetaire",
    }
  );
  return Status;
};
