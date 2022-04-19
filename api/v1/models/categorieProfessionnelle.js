"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CategorieProfessionnelle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.AgentModel, {
        foreignKey: "catProfId",
        as: "categorie_detail_id",
      });
    }
  }
  CategorieProfessionnelle.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "CategorieProfModel",
      tableName: "catProfessionnelle",
    }
  );
  return CategorieProfessionnelle;
};
