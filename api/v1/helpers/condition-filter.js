const { Op } = require("sequelize");

const mission = (query) => {
  //analyse de filtre

  //1. filtre de status
  const { status, date_debut, date_fin } = query;
  let whereClause = {};
  if (status && status > 0) {
    whereClause = {
      ...whereClause,
      statusId: status,
    };
  }

  //2. filtre en fonction de date
  if (date_debut && date_fin) {
    whereClause = {
      ...whereClause,
      date_create: {
        [Op.between]: [date_debut, date_fin],
      },
    };
  }

  //3. all mission en fonction du mois encours
  if (Object.keys(whereClause).length < 1) {
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1
    }`;
    whereClause = {
      date_create: {
        [Op.startsWith]: date,
      },
    };
  }

  return whereClause;
};
const reunions = (query) => {
  const { typereunion, date_debut, date_fin } = query;
  let whereClause = {};
  //1.filtre type reunion

  if (typereunion && typereunion > 0) {
    whereClause = {
      ...whereClause,
      typeReunionId: typereunion,
    };
  }

  //2. filtre en fonction de date
  if (date_debut && date_fin) {
    whereClause = {
      ...whereClause,
      date_reunion: {
        [Op.between]: [date_debut, date_fin],
      },
    };
  }
  //all reunions en fonction du mois encours
  if (Object.keys(whereClause).length < 1) {
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1
    }`;
    whereClause = {
      date_reunion: {
        [Op.startsWith]: date,
      },
    };
  }
  return whereClause;
};

module.exports = { mission, reunions };
