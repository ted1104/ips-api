"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("documents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      typeDocumentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "type_document",
          },
          key: "id",
        },
      },
      structureId: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "structures",
          },
          key: "id",
        },
      },
      titre: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      path: {
        allowNull: false,
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("documents");
  },
};
