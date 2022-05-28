"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rubrique_fixe_montant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.RubriquesModel, {
        foreignKey: "rubriqueId",
        as: "fixe_montant_detail",
      });
    }
  }
  Rubrique_fixe_montant.init(
    {
      rubriqueId: DataTypes.INTEGER,
      ligneBudgetaireId: DataTypes.INTEGER,
      montant: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "RubriqueFixeMontantModel",
      tableName: "fin_rubrique_fixe_montant",
    }
  );
  return Rubrique_fixe_montant;
};
