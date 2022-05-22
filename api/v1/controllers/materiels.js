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
  inventaireSchemaValidation,
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
  InventairesModel,
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

const addInventaire = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = inventaireSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  const { materielId, qte, etat, year, trimestreId } = body;
  //getSpecific materiel
  const materiel = await MaterielsModel.findOne({
    where: {
      id: materielId,
    },
  });
  if (!materiel) {
    throw new BadRequest("Ce materiel est introuvable");
  }
  //check if inventaire existe deja
  const checkIfInventaireExist = await InventairesModel.findOne({
    where: {
      materielId,
      year,
      trimestreId,
    },
  });
  if (checkIfInventaireExist) {
    throw new BadRequest(
      "L'inventaire de ce materiel pour ce trimestre existe déjà"
    );
  }

  //checkif inventaire precedent existe
  if (trimestreId > 1) {
    const checkIfInventairePrecentExist = await InventairesModel.findOne({
      where: {
        materielId,
        year,
        trimestreId: parseInt(trimestreId) - 1,
      },
    });
    if (!checkIfInventairePrecentExist) {
      throw new BadRequest(
        "Impossible de faire cet inventaire car l'inventaire précédent n'existe pas "
      );
    }
  }

  const ecart = parseInt(qte) - parseInt(materiel.qte);
  const tosave = { ...body, ecart };
  const saved = await InventairesModel.create(tosave);

  //update le stock
  await MaterielsModel.update({ qte, etat }, { where: { id: materielId } });
  const msg = "L'inventaire a été crée avec succès";
  return successHandler.Created(res, saved, msg);
});

const getInventaire = asyncWrapper(async (req, res) => {
  const year = 2022;
  const search = req.query;
  let whereCondition = { year };
  // if (search) {
  //   whereCondition  ={
  //     ...whereCondition,

  //   }
  // }
  const data = await MaterielsModel.findAll();
  const inventaire = await InventairesModel.findAll({
    attributes: [
      "id",
      "year",
      "trimestreId",
      "materielId",
      "qte",
      "etat",
      "observation",
      "ecart",
    ],
    where: whereCondition,
  });

  const datas = data.map((item) => {
    const { id, description, qte, etat } = item;
    const first = inventaire.filter(
      (item) => item.materielId === id && item.trimestreId === 1
    );
    const second = inventaire.filter(
      (item) => item.materielId === id && item.trimestreId === 2
    );
    const thrid = inventaire.filter(
      (item) => item.materielId === id && item.trimestreId === 3
    );
    const four = inventaire.filter(
      (item) => item.materielId === id && item.trimestreId === 4
    );
    return {
      id,
      description,
      qte,
      etat,
      first: first[0]
        ? first[0]
        : { qte: "-", etat: "-", observation: "-", ecart: "-" },
      second: second[0]
        ? second[0]
        : { qte: "-", etat: "-", observation: "-", ecart: "-" },
      thrid: thrid[0]
        ? thrid[0]
        : { qte: "-", etat: "-", observation: "-", ecart: "-" },
      four: four[0]
        ? four[0]
        : { qte: "-", etat: "-", observation: "-", ecart: "-" },
    };
  });

  return successHandler.Ok(res, datas);
});

module.exports = { addMateriel, getAllMateriels, addInventaire, getInventaire };
