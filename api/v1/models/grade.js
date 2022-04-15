"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class grade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.AgentModel, { foreignKey: "gradeId" });
    }
  }
  grade.init(
    {
      description: {
        type: DataTypes.STRING,
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "GradeModel",
      tableName: "grades",
    }
  );
  return grade;
};
