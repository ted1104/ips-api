"use strict";

const { sequelize } = require("../models");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("agents", "gradeId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "grades",
        },
        key: "id",
      },
    });
    await queryInterface.addColumn("agents", "fonctionId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "fonctions",
        },
        key: "id",
      },
    });
    await queryInterface.addColumn("agents", "num_cnom_cnop_cnoi", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("agents", "catProfId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "catProfessionnelle",
        },
        key: "id",
      },
    });
    await queryInterface.addColumn("agents", "niveau_etudes", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("agents", "ref_affectation", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("agents", "ref_arret_admis_status", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("agents", "structureId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "structures",
        },
        key: "id",
      },
    });
    await queryInterface.addColumn("agents", "zonesanteId", {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: {
          tableName: "zone_santes",
        },
        key: "id",
      },
    });
    await queryInterface.addColumn("agents", "salaire", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("agents", "primes", {
      type: Sequelize.STRING,
      allowNull: false,
    });
    await queryInterface.addColumn("agents", "dob", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.addColumn("agents", "date_engagement", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    /**
     *
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
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
