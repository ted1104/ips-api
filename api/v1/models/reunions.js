"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Reunions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.ReunionsFichiersModel, {
        foreignKey: "reunionId",
        as: "reunions_fichier_detail",
      });
      this.belongsTo(models.AgentModel, {
        foreignKey: "created_by",
        as: "user_create",
      });

      this.belongsTo(models.TypeReunionsModel, {
        foreignKey: "typeReunionId",
        as: "type_reunion_detail_id",
      });
    }
  }
  Reunions.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      titre: DataTypes.STRING,
      date_reunion: DataTypes.STRING,
      date_adoption: DataTypes.DATE,
      created_by: DataTypes.INTEGER,
      typeReunionId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ReunionsModel",
      tableName: "reunions",
    }
  );
  return Reunions;
};
