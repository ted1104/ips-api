'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Missions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Missions.init({
    nom: DataTypes.STRING,
    date_debut: DataTypes.DATE,
    date_create: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Missions',
  });
  return Missions;
};