"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Missions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.StatusModel, {
        foreignKey: "statusId",
        as: "status_detail_id",
      });
      this.belongsTo(models.StructureModel, {
        foreignKey: "structureId",
        as: "structure_detail_mission_id",
      });
      this.hasMany(models.MissionsFichiersModel, {
        foreignKey: "missionId",
        as: "mission_fichier_detail_id",
      });
    }
  }
  Missions.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nom: DataTypes.STRING,
      date_debut: DataTypes.DATE,
      date_create: DataTypes.DATE,
      statusId: DataTypes.INTEGER,
      structureId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MissionsModel",
      tableName: "missions",
    }
  );
  return Missions;
};
