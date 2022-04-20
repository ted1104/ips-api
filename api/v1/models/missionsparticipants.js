'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MissionsParticipants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  MissionsParticipants.init({
    missionId: DataTypes.INTEGER,
    agentId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'MissionsParticipants',
  });
  return MissionsParticipants;
};