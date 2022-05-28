"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class missions_fichiers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.TypeFichierModel, {
        foreignKey: "typefichierId",
        as: "type_fichier_detail",
      });
      this.belongsTo(models.MissionsModel, {
        foreignKey: "missionId",
        as: "mission_fichier_detail_id",
      });
    }
  }
  missions_fichiers.init(
    {
      missionId: DataTypes.INTEGER,
      typefichierId: DataTypes.INTEGER,
      path: DataTypes.STRING,
      name_fichier: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "MissionsFichiersModel",
      tableName: "missions_fichiers",
    }
  );
  return missions_fichiers;
};
