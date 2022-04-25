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
      rubriqueId: DataTypes.INTEGER,
      ligneBudgetaireId: DataTypes.INTEGER,
      montant: DataTypes.FLOAT,
      date_creation: DataTypes.DATE,
      motif: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "DepensesLigneBudgetairesModel",
      tableName: "depenses_ligne_budgetaires",
    }
  );
  return DepensesLigneBudgetaires;
};
