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
  sanctionSchemaValidation,
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
  PartenaireModel,
  SanctionsModel,
} = require("../models");

const getAllMissions = asyncWrapper(async (req, res) => {
  let condition_filter = filterRequest.mission(req.query);
  const { role, structure } = req.user;

  if (role === 5) {
    condition_filter = { ...condition_filter, structureId: structure };
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
      {
        model: PartenaireModel,
        as: "partenaire_mission",
        attributes: attrb.attr_statique_tables,
      },
    ],
    attributes: attrb.attr_missions,
    where: condition_filter,
  });

  //si c;est un participant
  return successHandler.Ok(res, data);
});

const getAllMissionImParticipated = asyncWrapper(async (req, res) => {
  const { id, role, structure } = req.user;
  const agentDetail = await AuthModel.findOne({ where: { id: id } });

  // console.log(req.user);

  let condition_filter = filterRequest.mission(req.query);
  const data = await MissionsModel.findAll({
    where: condition_filter,
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
      {
        model: MissionsParticipantsModel,
        as: "missions_participant_detail_id",
        required: true,
        where: { agentId: agentDetail.agentId },
      },
      {
        model: PartenaireModel,
        as: "partenaire_mission",
        attributes: attrb.attr_statique_tables,
      },
    ],
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
        model: PartenaireModel,
        as: "partenaire_mission",
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
          include: [
            {
              model: FonctionModel,
              as: "fonction_detail_id",
              attributes: ["id", "description"],
            },
          ],
        },
      },
    ],
  });

  const gettypefichier = await TypeFichierModel.findAll({
    attributes: attrb.attr_statique_tables,
    where: {
      pour: 1,
    },
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

  if (getOne.length < 1) {
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
    noFile: "le fichier lié à la reunion est obligatoire",
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

const changeMissionStatus = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const { ids, uuids } = splitid(id);
  const st = ["ATTENTE", "EN COURS", "TERMINEE", "ARCHIVEE"];

  if (!status) {
    throw new BadRequest("Veuillez svp selectionner un status");
  }

  //check if mission have already files uploaded (PV, ORDRE DE MISSION)
  if (status === 3 || status === 4) {
    const havePvfilesPv = await MissionsFichiersModel.findOne({
      where: { missionId: ids, typefichierId: 2 },
    });
    const havePvfilesOrdre = await MissionsFichiersModel.findOne({
      where: { missionId: ids, typefichierId: 3 },
    });
    if (!havePvfilesPv || !havePvfilesOrdre) {
      throw new BadRequest(
        `Imposssible de changer cette mission en status ${
          st[status - 1]
        } car certains fichiers sont manquants (PV ou ORDER DE MISSION) `
      );
    }
  }

  const updated = await MissionsModel.update(
    { statusId: status },
    { where: { id: ids, uuid: uuids } }
  );

  if (updated == 0) {
    throw new BadRequest(
      "Impossible de changer le status de cette mission, il se peut que ça n'existe pas"
    );
  }

  const msg = "le status de la mission a été changé avec succès";
  return successHandler.Created(res, updated, msg);
});

const createSanction = asyncWrapper(async (req, res) => {
  let body = req.body;
  const { agentId } = req.user;
  body = { ...body, created_by: agentId };

  const validation = sanctionSchemaValidation.validate(body);
  const { value, error } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  const savedSanction = await SanctionsModel.create(body);
  const msg = "La sanction à cette mission a été enregistré";
  return successHandler.Created(res, savedSanction, msg);
});
module.exports = {
  getAllMissions,
  getAllMissionImParticipated,
  createMission,
  createMissionFiles,
  getOneMission,
  changeMissionStatus,
  createSanction,
};
