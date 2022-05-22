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
  depenseSchemaValidation,
  rubriqueFixeMontantSchemaValidation,
  materielSchemaValidation,
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
  StatusLignesModel,
  RubriquesModel,
  DepensesModel,
  RubriqueFixeMontantLigneModel,
  SousRubriquesModel,
  MaterielsModel,
} = require("../models");

const getAllMateriels = asyncWrapper(async (req, res) => {
  const data = await MaterielsModel.findAll();
  return successHandler.Ok(res, data);
});

const addMateriel = asyncWrapper(async (req, res) => {
  const body = req.body;
  const { description, qte } = body;
  const validation = materielSchemaValidation.validate(body);

  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  //check if not exist
  const checkingIfExist = await MaterielsModel.findOne({
    where: { description },
  });
  if (checkingIfExist) {
    throw new BadRequest("cet equipement existe déja dans le stock");
  }

  const saved = await MaterielsModel.create(body);
  const msg = "le materiel a été bien enregistré";
  return successHandler.Created(res, saved, msg);
});

module.exports = { addMateriel, getAllMateriels };
