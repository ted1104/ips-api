"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Depenses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.SousRubriquesModel, {
        foreignKey: "sousRubriqueId",
        as: "depenses_detail",
      });
      this.belongsTo(models.PartenaireModel, {
        foreignKey: "partenaireId",
        as: "partenaire_detail",
      });
    }
  }
  Depenses.init(
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
  return Depenses;
};
