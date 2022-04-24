"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reunions_fichiers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.ReunionsModel, {
        foreignKey: "reunionId",
        as: "reunions_fichier_detail",
      });
      this.belongsTo(models.TypeFichierModel, {
        foreignKey: "typefichierId",
        as: "type_fichier_reunion_detail",
      });
    }
  }
  Reunions_fichiers.init(
    {
      reunionId: DataTypes.INTEGER,
      typefichierId: DataTypes.INTEGER,
      path: DataTypes.STRING,
      name_fichier: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ReunionsFichiersModel",
      tableName: "reunions_fichiers",
    }
  );
  return Reunions_fichiers;
};
