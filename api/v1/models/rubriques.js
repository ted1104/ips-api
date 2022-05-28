"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rubriques extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.SousRubriquesModel, {
        foreignKey: "rubriqueId",
        as: "sous_rubriques",
      });

      this.hasOne(models.RubriqueFixeMontantModel, {
        foreignKey: "rubriqueId",
        as: "fixe_montant_detail",
      });
    }
  }
  Rubriques.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RubriquesModel",
      tableName: "fin_rubriques",
    }
  );
  return Rubriques;
};
