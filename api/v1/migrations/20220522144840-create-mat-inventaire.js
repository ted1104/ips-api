"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("mat_inventaires", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      year: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      qte: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      trimestreId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "mat_trimestres`",
          },
          key: "id",
        },
      },
      etat: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      ecart: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      observation: {
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
    await queryInterface.dropTable("mat_inventaires");
  },
};
