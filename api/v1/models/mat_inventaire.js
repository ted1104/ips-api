"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mat_inventaire extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mat_inventaire.init(
    {
      year: DataTypes.INTEGER,
      qte: DataTypes.INTEGER,
      trimestreId: DataTypes.INTEGER,
      materielId: DataTypes.INTEGER,
      etat: DataTypes.STRING,
      ecart: DataTypes.INTEGER,
      observation: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "InventairesModel",
      tableName: "mat_inventaires",
    }
  );
  return mat_inventaire;
};
