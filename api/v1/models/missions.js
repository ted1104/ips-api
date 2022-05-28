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
      // this.belongsToMany(models.MissionsParticipantsModel, {
      //   through: "missions",
      // });
      this.hasMany(models.MissionsParticipantsModel, {
        foreignKey: "missionId",
        as: "missions_participant_detail_id",
      });

      this.belongsTo(models.PartenaireModel, {
        foreignKey: "partenaireId",
        as: "partenaire_mission",
      });
      this.hasMany(models.SanctionsModel, {
        foreignKey: "missionId",
        as: "sanction_proposee",
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
      partenaireId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MissionsModel",
      tableName: "missions",
    }
  );
  return Missions;
};
