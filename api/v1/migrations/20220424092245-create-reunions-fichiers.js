"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Reunions_fichiers", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      reunionsId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "reunions",
          },
          key: "id",
        },
      },
      typeFichieId: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "type_fichier",
          },
          key: "id",
        },
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
    await queryInterface.dropTable("Reunions_fichiers");
  },
};
