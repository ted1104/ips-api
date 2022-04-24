const { Op } = require("sequelize");

const asyncWrapper = require("../middlewares/async");
const { BadRequest } = require("../errors");
const { successHandler, uploaderFile, attrb, splitid } = require("../helpers/");
const {
  missionSchemaValidation,
  fichierMissionSchemaValidation,
  filterIntervalSchemaValidation,
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
} = require("../models");
const { object } = require("joi");

const getAllMissions = asyncWrapper(async (req, res) => {
  //analyse de filtre
  //1. filtre de status
  const { status, date_debut, date_fin } = req.query;
  let whereClause = {};
  if (status && status > 0) {
    whereClause = {
      ...whereClause,
      statusId: status,
    };
  }

  //2. filtre en fonction de date
  if (date_debut && date_fin) {
    const validation = filterIntervalSchemaValidation.validate({
      date_debut,
      date_fin,
    });
    const { error, value } = validation;
    if (error) {
      return BadRequest(error.details[0].message);
    }
    whereClause = {
      ...whereClause,
      date_create: {
        [Op.between]: [date_debut, date_fin],
      },
    };
  }

  //3. all mission en fonction du mois encours
  if (Object.keys(whereClause).length < 1) {
    const today = new Date();
    const date = `${today.getFullYear()}-${
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1
    }`;
    whereClause = {
      date_create: {
        [Op.startsWith]: date,
      },
    };
    // console.log("aucun filtre appliquer ", date);
  }

  const data = await MissionsModel.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: StatusModel,
        as: "status_detail_id",
        attributes: attrb.attr_statique_status,
      },
      {
        model: StructureModel,
        as: "structure_detail_mission_id",
        attributes: attrb.attr_statique_tables,
      },
    ],
    attributes: attrb.attr_missions,
    where: whereClause,
  });
  return successHandler.Ok(res, data);
});

const getOneMission = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { ids, uuids } = splitid(id);
  const getOne = await MissionsModel.findAll({
    where: { id: ids, uuid: uuids },
    attributes: attrb.attr_missions,
    include: [
      {
        model: StatusModel,
        as: "status_detail_id",
        attributes: attrb.attr_statique_status,
      },
      {
        model: StructureModel,
        as: "structure_detail_mission_id",
        attributes: attrb.attr_statique_tables,
      },
      {
        model: MissionsParticipantsModel,
        as: "missions_participant_detail_id",
        attributes: ["id"],
        include: {
          model: AgentModel,
          as: "agent_participant_detail_id",
          attributes: [
            "id",
            "uuid",
            "nom",
            "prenom",
            "matricule",
            "niveau_etudes",
          ],
        },
      },
    ],
  });

  const gettypefichier = await TypeFichierModel.findAll({
    attributes: attrb.attr_statique_tables,
    include: {
      model: MissionsFichiersModel,
      as: "type_fichier_detail",
      attributes: ["id", "path", "name_fichier"],
      where: {
        missionId: ids,
      },
      required: false,
    },
  });

  if (!getOne) {
    throw new BadRequest("Aucune mission trouvée");
  }

  const data = {
    mission: getOne,
    fichiers: gettypefichier,
  };
  return successHandler.Ok(res, data);
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
  const tovalidate = {
    missionId: body.missionId,
    typefichierId: body.typefichierId,
    name_fichier: body.name_fichier,
  };

  //validation
  const validation = fichierMissionSchemaValidation.validate(tovalidate);
  const { value, error } = validation;

  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  const file = req.files;
  //uploads files config
  const msgs = {
    noFile: "le fichier est obligatoire",
    invalideFile: "Svp charger envoyer un fichier valide, un pdf est requis",
  };
  const path = await uploaderFile(file, msgs);
  const { src, name } = path;

  //save data

  const data_to_save = { ...body, path: src };
  const savedFile = await MissionsFichiersModel.create(data_to_save);

  const msg = "le fichier lié à cette mission a été bien enregistré";
  return successHandler.Created(res, savedFile, msg);
});

module.exports = {
  getAllMissions,
  createMission,
  createMissionFiles,
  getOneMission,
};
