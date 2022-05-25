"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class documents extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.StructureModel, {
        foreignKey: "structureId",
        as: "structure_doc",
      });
      this.belongsTo(models.TypeDocumentModel, {
        foreignKey: {
          allowNull: true,
          name: "typeDocumentId",
        },
        onDelete: "CASCADE",
        as: "type_doc",
      });
    }
  }
  documents.init(
    {
      typeDocumentId: DataTypes.INTEGER,
      structureId: DataTypes.INTEGER,
      titre: DataTypes.STRING,
      path: DataTypes.TEXT,
      year: DataTypes.INTEGER,
    },
    {
      sequelize,
      tableName: "documents",
      modelName: "DocumentsModel",
    }
  );
  return documents;
};
