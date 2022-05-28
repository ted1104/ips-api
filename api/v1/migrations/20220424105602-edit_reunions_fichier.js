"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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
      path: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      name_fichier: {
        allowNull: false,
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
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
