"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class fonction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.AgentModel, { foreignKey: "fonctionId" });
    }
  }
  fonction.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "FonctionModel",
      tableName: "fonctions",
    }
  );
  return fonction;
};
