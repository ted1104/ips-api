"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("agents", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      nom: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      prenom: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      sexe: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      matricule: {
        allowNull: true,
        type: Sequelize.STRING,
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
    await queryInterface.dropTable("agents");
  },
};
