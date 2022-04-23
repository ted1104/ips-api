"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MissionsParticipants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsToMany(models.MissionsModel, { through: "missions" });
      // this.belongsToMany(models.AgentModel, { through: "agentId" });
      this.belongsTo(models.MissionsModel, {
        foreignKey: "missionId",
        as: "missions_participant_detail_id",
      });
      this.belongsTo(models.AgentModel, {
        foreignKey: "agentId",
        as: "agent_participant_detail_id",
      });
    }
  }
  MissionsParticipants.init(
    {
      missionId: DataTypes.INTEGER,
      agentId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "MissionsParticipantsModel",
      tableName: "missions_participants",
    }
  );
  return MissionsParticipants;
};
