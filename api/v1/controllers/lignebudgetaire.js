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
  reunionSchemaValidation,
  fichierReunionSchemaValidation,
  operationBanqueSchemaValidation,
  ligneBudgetaireSchemaValidation,
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
  ReunionsModel,
  ReunionsFichiersModel,
  TypeReunionsModel,
  BanqueOperationModel,
  PartenaireModel,
  LigneBudgetairesModel,
} = require("../models");

const getAllLigneBudgetaire = asyncWrapper(async (req, res) => {});
const createLigneBudgetaire = asyncWrapper(async (req, res) => {
  const body = req.body;

  const validation = ligneBudgetaireSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  const newbody = { ...body, date_create: new Date() };
  const saved = await LigneBudgetairesModel.create(newbody);

  const msg = "La ligne budgetaire a été crée avec succès";
  return successHandler.Created(res, msg, saved);
});

module.exports = { getAllLigneBudgetaire, createLigneBudgetaire };
