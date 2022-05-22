"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class DepensesLigneBudgetaires extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.RubriquesModel, {
        foreignKey: "rubriqueId",
        as: "depenses_detail",
      });
    }
  }
  DepensesLigneBudgetaires.init(
    {
      sousRubriqueId: DataTypes.INTEGER,
      partenaireId: DataTypes.INTEGER,
      montant: DataTypes.FLOAT,
      date_creation: DataTypes.DATE,
      motif: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DepensesModel",
      tableName: "fin_depenses",
    }
  );
  return DepensesLigneBudgetaires;
};
