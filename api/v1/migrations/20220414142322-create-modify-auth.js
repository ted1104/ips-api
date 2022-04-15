"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("auths", "agentId", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: "Agents",
        },
        key: "id",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("auths");
  },
};
