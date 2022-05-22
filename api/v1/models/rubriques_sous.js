"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class rubriques_sous extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.DepensesModel, {
        foreignKey: "sousRubriqueId",
        as: "depenses_detail",
      });
      this.belongsTo(models.RubriquesModel, {
        foreignKey: "rubriqueId",
        as: "sous_rubriques",
      });
    }
  }
  rubriques_sous.init(
    {
      description: DataTypes.STRING,
      rubriqueId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SousRubriquesModel",
      tableName: "fin_rubriques_sous",
    }
  );
  return rubriques_sous;
};
