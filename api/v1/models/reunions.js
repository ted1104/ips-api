"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reunions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ReunionsFichiersModel, {
        foreignKey: "reunionId",
        as: "reunions_fichier_detail",
      });
    }
  }
  Reunions.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      titre: DataTypes.STRING,
      date_reunion: DataTypes.STRING,
      date_adoption: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ReunionsModel",
      tableName: "reunions",
    }
  );
  return Reunions;
};
