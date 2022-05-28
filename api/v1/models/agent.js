"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Agent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.CategorieProfModel, {
        foreignKey: "catProfId",
        as: "categorie_detail_id",
      });
      this.belongsTo(models.FonctionModel, {
        foreignKey: "fonctionId",
        as: "fonction_detail_id",
      });
      this.belongsTo(models.GradeModel, {
        foreignKey: "gradeId",
        as: "grade_detail_id",
      });
      this.belongsTo(models.StructureModel, {
        foreignKey: "structureId",
        as: "structure_detail_id",
      });
      this.belongsTo(models.ZoneSanteModel, {
        foreignKey: "zonesanteId",
        as: "zone_sante_detail_id",
      });

      this.hasOne(models.AuthModel, {
        foreignKey: "agentId",
        as: "agent_detail_id",
      });

      this.hasMany(models.MissionsParticipantsModel, {
        foreignKey: "agentId",
        as: "mission_participant_id",
      });

      this.belongsToMany(models.MissionsParticipantsModel, {
        through: "agentId",
      });
      this.hasMany(models.MissionsParticipantsModel, {
        foreignKey: "agentId",
        as: "agent_participant_detail_id",
      });

      this.hasMany(models.ReunionsModel, {
        foreignKey: "created_by",
        as: "user_create",
      });
      this.hasMany(models.SanctionsModel, {
        foreignKey: "created_by",
        as: "creer_par",
      });
    }
  }
  Agent.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      nom: DataTypes.STRING,
      prenom: DataTypes.STRING,
      sexe: DataTypes.INTEGER,
      matricule: DataTypes.STRING,
      gradeId: DataTypes.INTEGER,
      fonctionId: DataTypes.INTEGER,
      num_cnom_cnop_cnoi: DataTypes.STRING,
      catProfId: DataTypes.INTEGER,
      niveau_etudes: DataTypes.STRING,
      ref_affectation: DataTypes.STRING,
      ref_arret_admis_status: DataTypes.STRING,
      structureId: DataTypes.INTEGER,
      zonesanteId: DataTypes.INTEGER,
      salaire: DataTypes.STRING,
      primes: DataTypes.STRING,
      dob: DataTypes.STRING,
      date_engagement: DataTypes.STRING,
      status: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "AgentModel",
      tableName: "agents",
    }
  );
  return Agent;
};
