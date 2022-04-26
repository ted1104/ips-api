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
  depenseLigneBudgetaireSchemaValidation,
  rubriqueFixeMontantSchemaValidation,
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
  DepensesLigneBudgetairesModel,
  RubriqueFixeMontantLigneModel,
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
const getOneLigneBudgetaire = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { ids, uuids } = splitid(id);
  const getOne = await LigneBudgetairesModel.findOne({
    where: { id: ids, uuid: uuids },
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

  const rubriques = await RubriquesModel.findAll({
    attributes: ["id", "description"],
    include: [
      {
        model: RubriqueFixeMontantLigneModel,
        as: "fixe_montant_detail",
        where: { ligneBudgetaireId: ids },
        attributes: ["montant"],
        required: false,
      },
      {
        model: DepensesLigneBudgetairesModel,
        as: "depenses_detail",
        where: { ligneBudgetaireId: ids },
        required: false,
      },
    ],
  });
  const datas = {
    ligne: getOne,
    rubriques,
  };

  if (!getOne) {
    throw new BadRequest("Aucune ligne budgetaire trouvée");
  }
  return successHandler.Ok(res, datas);
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

const createDepenseLigneBudgetaire = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = depenseLigneBudgetaireSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  const newbody = { ...body, date_creation: new Date() };
  const saved = await DepensesLigneBudgetairesModel.create(newbody);

  //deduire montant dans le solde en banque du partenaire
  const ligneBudgtaire = await LigneBudgetairesModel.findOne({
    where: { id: body.ligneBudgetaireId },
  });
  const { partenaireId } = ligneBudgtaire;
  const partenaire = await PartenaireModel.findOne({
    where: { id: partenaireId },
  });

  const newAmount = parseFloat(partenaire.solde) - parseFloat(body.montant);
  const updated = await PartenaireModel.update(
    { solde: newAmount },
    { where: { id: partenaireId } }
  );

  const msg = "la depense a été bien enregistré";
  return successHandler.Created(res, saved, msg);
});
const createMontantFixeRubrique = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = rubriqueFixeMontantSchemaValidation.validate(body);
  const { value, error } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  //checking if another config exist
  const { rubriqueId, ligneBudgetaireId, montant } = body;
  const check = await RubriqueFixeMontantLigneModel.findOne({
    where: { rubriqueId, ligneBudgetaireId },
  });
  if (check) {
    throw new BadRequest(
      "Cette rubrique possède déjà une configuration du montant pour cette ligne budgetaire"
    );
  }

  const saved = await RubriqueFixeMontantLigneModel.create(body);
  const msg = "le montant fixe a été bien configuré";

  return successHandler.Created(res, saved, msg);
});
module.exports = {
  getAllLigneBudgetaire,
  createLigneBudgetaire,
  getOneLigneBudgetaire,
  createDepenseLigneBudgetaire,
  createMontantFixeRubrique,
};
