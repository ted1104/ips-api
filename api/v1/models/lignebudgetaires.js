"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class LigneBudgetaires extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  LigneBudgetaires.init(
    {
      description: DataTypes.TEXT,
      montant: DataTypes.FLOAT,
      partenaireId: DataTypes.INTEGER,
      statusId: DataTypes.INTEGER,
      date_create: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "LigneBudgetairesModel",
      tableName: "lignebudgetaires",
    }
  );
  return LigneBudgetaires;
};
