const asyncWrapper = require("../middlewares/async");
const { BadRequest } = require("../errors");
const { successHandler } = require("../helpers/");
const { missionSchemaValidation } = require("../validations");

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

module.exports = { getAllMissions, createMission };
