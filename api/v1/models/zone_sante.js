"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class zone_sante extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.AgentModel);
    }
  }
  zone_sante.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "ZoneSanteModel",
      tableName: "zone_santes",
    }
  );
  return zone_sante;
};
