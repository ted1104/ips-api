const { StatusCodes } = require("http-status-codes");

const notFound = (req, res) => {
  res.status(StatusCodes.NOT_FOUND).json({
    status: "false",
    msg: "Aucune ressource trouvée à cette url !",
  });
};

module.exports = notFound;
