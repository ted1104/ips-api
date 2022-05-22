'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class mat_trimestre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  mat_trimestre.init({
    description: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'mat_trimestre',
  });
  return mat_trimestre;
};