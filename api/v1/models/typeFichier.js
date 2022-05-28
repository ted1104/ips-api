"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TypeFichier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.MissionsFichiersModel, {
        foreignKey: "typefichierId",
        as: "type_fichier_detail",
      });
      this.hasMany(models.ReunionsFichiersModel, {
        foreignKey: "typefichierId",
        as: "type_fichier_reunion_detail",
      });
    }
  }
  TypeFichier.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TypeFichierModel",
      tableName: "type_fichier",
    }
  );
  return TypeFichier;
};
