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
    }
  }
  Agent.init(
    {
      nom: DataTypes.STRING,
      prenom: DataTypes.STRING,
      sexe: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "AgentModel",
      tableName: "agents",
    }
  );
  return Agent;
};
