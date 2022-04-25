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
      this.hasMany(models.BanqueOperationModel, {
        foreignKey: "partenaireId",
        as: "operation_banque_detail",
      });
    }
  }
  fonction.init(
    {
      description: DataTypes.STRING,
      solde: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: "PartenaireModel",
      tableName: "partenaire",
    }
  );
  return fonction;
};
