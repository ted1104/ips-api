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
} = require("../models");

const getOneDetailOneRubrique = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { ids, uuids: uuid } = splitid(id);
  const datas = await RubriquesModel.findOne({
    where: { id, uuid },
    include: [
      {
        model: SousRubriquesModel,
        as: "sous_rubriques",
        attributes: attrb.attr_statique_tables,
        include: [
          {
            model: DepensesModel,
            as: "depenses_detail",
            attributes: [
              "id",
              "montant",
              "date_creation",
              "motif",
              "createdAt",
            ],
            include: [
              {
                model: PartenaireModel,
                as: "partenaire_detail",
                attributes: attrb.attr_statique_tables,
              },
            ],
          },
        ],
      },
    ],
  });

  const partenaires = await PartenaireModel.findAll({
    attributes: ["id", "description"],
  });
  const data = {
    datas,
    partenaires,
  };

  return successHandler.Ok(res, data);
});

const createDepense = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = depenseSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  const { partenaireId, montant } = body;
  const partenaire = await PartenaireModel.findOne({
    where: { id: partenaireId },
  });
  if (parseFloat(partenaire.solde) < montant) {
    throw new BadRequest(
      "Cette somme ne se trouve pas dans le compte dans ce partenaire"
    );
  }
  const newbody = { ...body, date_creation: new Date() };
  const saved = await DepensesModel.create(newbody);

  //deduire montant dans le solde en banque du partenaire
  const newAmount = parseFloat(partenaire.solde) - parseFloat(body.montant);
  const updated = await PartenaireModel.update(
    { solde: newAmount },
    { where: { id: partenaireId } }
  );

  const msg = "la depense a été bien enregistré";
  return successHandler.Created(res, saved, msg);
});

module.exports = {
  getOneDetailOneRubrique,
  createDepense,
};
