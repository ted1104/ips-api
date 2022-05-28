"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TypeDocument extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.DocumentsModel, {
        foreignKey: {
          allowNull: true,
          name: "typeDocumentId",
        },
        onDelete: "CASCADE",
        as: "type_doc",
      });
    }
  }
  TypeDocument.init(
    {
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "TypeDocumentModel",
      tableName: "type_document",
    }
  );
  return TypeDocument;
};
