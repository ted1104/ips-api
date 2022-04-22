const asyncWrapper = require("../middlewares/async");
const { BadRequest } = require("../errors");
const { successHandler, uploaderFile } = require("../helpers/");
const {
  missionSchemaValidation,
  fichierMissionSchemaValidation,
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
} = require("../models");

const getAllMissions = asyncWrapper((req, res) => {
  return successHandler.Ok(res, []);
});

const createMission = asyncWrapper(async (req, res) => {
  const body = req.body;

  //validation
  const validation = missionSchemaValidation.validate(body);
  const { value, error } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  //date creation logic
  const newbody = { ...body, date_create: new Date() };

  //create la mission
  const savedMission = await MissionsModel.create(newbody);

  //create_participants
  const idMission = savedMission.id;
  const participants = body.agents.map((part) => {
    return { ...part, missionId: idMission };
  });

  //creation des participants
  const savedParticipans = await MissionsParticipantsModel.bulkCreate(
    participants
  );

  const msg = "la mission a été bien enregistrée";
  return successHandler.Created(res, savedMission, msg);
});

const createMissionFiles = asyncWrapper(async (req, res) => {
  const body = req.body;

  //validation
  const validation = fichierMissionSchemaValidation.validate(body);
  const { value, error } = validation;

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  const file = req.files;
  //uploads files config
  const msgs = {
    noFile: "un ou plusieurs fichiers sont obligatoires",
    invalideFile: "Svp charger envoyer un fichier valide, un pdf est requis",
  };
  const path = await uploaderFile(file, msgs);
  const { src, name } = path;

  const data_to_save = { ...body, path: src, name_fichier: name };
  const savedFile = await MissionsFichiersModel.create(data_to_save);

  const msg = "les fichiers liés à cette missions ont été bien enregistrés";
  return successHandler.Created(res, savedFile, msg);
});

module.exports = { getAllMissions, createMission, createMissionFiles };
