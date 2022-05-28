"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class mat_materiels extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mat_materiels.init(
    {
      description: DataTypes.STRING,
      qte: DataTypes.INTEGER,
      etat: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: "mat_materiels",
      modelName: "MaterielsModel",
    }
  );
  return mat_materiels;
};
