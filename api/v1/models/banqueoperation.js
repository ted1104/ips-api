"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Banque_operation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.PartenaireModel, {
        foreignKey: "partenaireId",
        as: "operation_banque_detail",
      });
    }
  }
  Banque_operation.init(
    {
      typeOperationId: DataTypes.INTEGER,
      partenaireId: DataTypes.INTEGER,
      montant: DataTypes.FLOAT,
      motif: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "BanqueOperationModel",
      tableName: "banque_operations",
    }
  );
  return Banque_operation;
};
