const { Op } = require("sequelize");

const asyncWrapper = require("../middlewares/async");
const { BadRequest } = require("../errors");
const { successHandler, uploaderFile, attrb, splitid } = require("../helpers/");
const {
  missionSchemaValidation,
  fichierMissionSchemaValidation,
  filterIntervalSchemaValidation,
  reunionSchemaValidation,
  fichierReunionSchemaValidation,
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
} = require("../models");

const getAllReunions = asyncWrapper(async (req, res) => {
  const data = await ReunionsModel.findAll();
  return successHandler.Ok(res, data);
});

const getOneReunions = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { ids, uuids } = splitid(id);
  const getOne = await ReunionsModel.findAll({
    where: { id: ids, uuid: uuids },
  });

  const gettypefichier = await TypeFichierModel.findAll({
    attributes: attrb.attr_statique_tables,
    where: {
      pour: 2,
    },
    include: {
      model: ReunionsFichiersModel,
      as: "type_fichier_reunion_detail",
      attributes: ["id", "path", "name_fichier"],
      where: {
        reunionId: ids,
      },
      required: false,
    },
  });

  if (!getOne) {
    throw new BadRequest("Aucune mission trouvée");
  }
  const data = {
    reunion: getOne,
    fichiers: gettypefichier,
  };

  return successHandler.Ok(res, data);
});

const createReunion = asyncWrapper(async (req, res) => {
  const currenUser = req.user;
  const body = { ...req.body, created_by: currenUser.id };
  const validation = reunionSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  const saved = await ReunionsModel.create(body);

  const msg = "La reunion a été enregistrée avec succès";
  return successHandler.Created(res, saved, msg);
});

const createReunionFile = asyncWrapper(async (req, res) => {
  const body = req.body;
  const tovalidate = {
    reunionId: body.reunionId,
    typefichierId: body.typefichierId,
    name_fichier: body.name_fichier,
  };

  //validation
  const validation = fichierReunionSchemaValidation.validate(tovalidate);
  const { value, error } = validation;

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  const file = req.files;
  console.log(file);
  //uploads files config
  const msgs = {
    noFile: "le fichier lié à cette reunion est obligatoire",
    invalideFile: "Svp charger envoyer un fichier valide, un pdf est requis",
  };
  const path = await uploaderFile(file, msgs);
  const { src, name } = path;

  //save data

  const data_to_save = { ...body, path: src };
  const savedFile = await ReunionsFichiersModel.create(data_to_save);

  const msg = "le fichier lié à cette reunion a été bien enregistré";
  return successHandler.Created(res, savedFile, msg);
});

module.exports = {
  getAllReunions,
  createReunion,
  createReunionFile,
  getOneReunions,
};
