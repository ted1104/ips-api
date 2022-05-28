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
} = require("../models");

const getAllOperationBanque = asyncWrapper(async (req, res) => {});
const createOperationBanque = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = operationBanqueSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  const saved = await BanqueOperationModel.create(body);

  //update account partenaire
  const { partenaireId, montant } = saved;

  //find ancien montant
  const partenaire = await PartenaireModel.findOne({
    where: { id: partenaireId },
  });

  const newAmount = parseFloat(partenaire.solde) + parseFloat(montant);
  const updated = await PartenaireModel.update(
    { solde: newAmount },
    { where: { id: partenaireId } }
  );

  const msg = "l'operation de dépôt a été enregistrée";

  return successHandler.Created(res, saved, msg);
});

module.exports = { getAllOperationBanque, createOperationBanque };
