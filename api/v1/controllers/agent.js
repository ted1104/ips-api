const asyncWrapper = require("../middlewares/async");
const { BadRequest, Unauthenticated } = require("../errors");
const { successHandler, bcryptHelper, attrb, splitid } = require("../helpers");
const { agentCreateSchemaValidation } = require("../validations");

const jwt = require("jsonwebtoken");

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
  MissionsParticipantsModel,
  MissionsModel,
  StatusModel,
} = require("../models");

const getAllAgents = asyncWrapper(async (req, res) => {
  const data = await AgentModel.findAll({
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: CategorieProfModel,
        as: "categorie_detail_id",
        attributes: attrb.attr_statique_tables,
      },
      {
        model: FonctionModel,
        as: "fonction_detail_id",
        attributes: attrb.attr_statique_tables,
      },
      {
        model: StructureModel,
        as: "structure_detail_id",
        attributes: attrb.attr_statique_tables,
      },
      {
        model: GradeModel,
        as: "grade_detail_id",
        attributes: attrb.attr_statique_tables,
      },
      {
        model: ZoneSanteModel,
        as: "zone_sante_detail_id",
        attributes: attrb.attr_statique_tables,
      },
    ],
  });
  return successHandler.Ok(res, data);
});

const createAgent = asyncWrapper(async (req, res) => {
  const body = req.body;
  const { matricule } = body;

  //validation
  const validation = agentCreateSchemaValidation.validate(body);
  const { value, error } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  //check if matricule number exist
  const checkingMatricule = await AgentModel.findOne({
    where: {
      matricule,
    },
  });

  if (checkingMatricule) {
    throw new BadRequest(
      "un autre agent avec ce même numéro matricule existe déjà"
    );
  }

  //creating agent
  const saved = await AgentModel.create(body);

  const msg = "L'agent a été crée avec succès";
  return successHandler.Created(res, saved, msg);
});

const getOneAgent = asyncWrapper(async (req, res) => {
  const { id } = req.params;
  const { ids, uuids } = splitid(id);
  const oneAgent = await AgentModel.findOne({
    where: { id: ids, uuid: uuids },
    attributes: attrb.attr_get_one_agent,
    include: [
      {
        model: CategorieProfModel,
        as: "categorie_detail_id",
        attributes: ["id", "description"],
      },
      {
        model: FonctionModel,
        as: "fonction_detail_id",
        attributes: ["id", "description"],
      },
      {
        model: StructureModel,
        as: "structure_detail_id",
        attributes: ["id", "description"],
      },
      {
        model: GradeModel,
        as: "grade_detail_id",
        attributes: ["id", "description"],
      },
      {
        model: ZoneSanteModel,
        as: "zone_sante_detail_id",
        attributes: ["id", "description"],
      },
      {
        model: AuthModel,
        as: "agent_detail_id",
        attributes: ["username", "actif"],
        include: [
          {
            model: RoleModel,
            as: "role_detail_id",
            attributes: ["id", "description"],
          },
        ],
      },
      {
        model: MissionsParticipantsModel,
        as: "agent_participant_detail_id",
        attributes: ["id"],
        limit: 5,
        offset: 0,
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: MissionsModel,
            as: "missions_participant_detail_id",
            attributes: ["id", "uuid", "nom", "date_debut"],

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
          },
        ],
      },
    ],
  });

  if (!oneAgent) {
    throw new BadRequest("Aucun agent trouvé");
  }

  const nbMission = await MissionsParticipantsModel.count({
    where: { agentId: ids },
  });

  const datas = {
    agent: oneAgent,
    nbre_mission: nbMission,
  };
  return successHandler.Ok(res, datas);
});
module.exports = { getAllAgents, getOneAgent, createAgent };
