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
  StatusLignesModel,
} = require("../models");

const getAllLigneBudgetaire = asyncWrapper(async (req, res) => {
  const data = await LigneBudgetairesModel.findAll({
    include: [
      {
        model: PartenaireModel,
        as: "partenaire_ligne_detail",
        attributes: ["id", "description", "solde"],
      },
      {
        model: StatusLignesModel,
        as: "status_ligne_detail_id",
        attributes: ["id", "description", "color"],
      },
    ],
  });
  return successHandler.Ok(res, data);
});
const createLigneBudgetaire = asyncWrapper(async (req, res) => {
  const body = req.body;

  const validation = ligneBudgetaireSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  // test if partenaire have le montant
  const partenaire = await PartenaireModel.findOne({
    where: { id: body.partenaireId },
  });
  if (parseFloat(partenaire.solde) < parseFloat(body.montant)) {
    throw new BadRequest(
      "Ce partenaire ne possède ce montant dans le compte en banque"
    );
  }

  const newbody = { ...body, date_create: new Date() };
  const saved = await LigneBudgetairesModel.create(newbody);

  const msg = "La ligne budgetaire a été crée avec succès";
  return successHandler.Created(res, saved, msg);
});

module.exports = { getAllLigneBudgetaire, createLigneBudgetaire };
