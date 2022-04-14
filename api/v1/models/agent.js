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
      this.belongsTo(models.CategorieProfModel);
      this.belongsTo(models.FonctionModel);
      this.belongsTo(models.GradeModel);
      this.belongsTo(models.StructureModel);
      this.belongsTo(models.ZoneSanteModel);

      this.hasOne(models.AuthModel);
    }
  }
  Agent.init(
    {
      nom: DataTypes.STRING,
      prenom: DataTypes.STRING,
      sexe: DataTypes.STRING,
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
      dob: DataTypes.DATE,
      date_engagement: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "AgentModel",
      tableName: "agents",
    }
  );
  return Agent;
};
