const { Op } = require("sequelize");

const asyncWrapper = require("../middlewares/async");
const { BadRequest } = require("../errors");
const {
  successHandler,
  uploaderFile,
  attrb,
  splitid,
  filterRequest,
} = require("../helpers/");
const {
  missionSchemaValidation,
  fichierMissionSchemaValidation,
  filterIntervalSchemaValidation,
  sanctionSchemaValidation,
} = require("../validations");

//models
const {
  RoleModel,
  GradeModel,
  FonctionModel,
  CategorieProfModel,
  StructureModel,
  ZoneSanteModel,
  AgentModel,
  AuthModel,
  MissionsModel,
  MissionsParticipantsModel,
  MissionsFichiersModel,
  StatusModel,
  TypeFichierModel,
  PartenaireModel,
  SanctionsModel,
  ReunionsModel,
  DocumentsModel,
} = require("../models");

const getDashboardData = asyncWrapper(async (req, res) => {
  const today = new Date();
  const date = today.getFullYear();
  const mission = await MissionsModel.count({
    where: {
      createdAt: {
        [Op.startsWith]: date,
      },
    },
  });
  const sanction = await SanctionsModel.count({
    where: {
      createdAt: {
        [Op.startsWith]: date,
      },
    },
  });
  const reunion = await ReunionsModel.count({
    where: {
      createdAt: {
        [Op.startsWith]: date,
      },
    },
  });
  const document = await DocumentsModel.count({
    where: {
      createdAt: {
        [Op.startsWith]: date,
      },
    },
  });
  const agent = await AgentModel.count();

  const datas = {
    mission,
    sanction,
    reunion,
    agent,
    document,
  };
  return successHandler.Ok(res, datas);
});

module.exports = { getDashboardData };
