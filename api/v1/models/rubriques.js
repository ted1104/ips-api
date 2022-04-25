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
    }
  }
  Rubriques.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RubriquesModel",
      tableName: "rubriques",
    }
  );
  return Rubriques;
};
