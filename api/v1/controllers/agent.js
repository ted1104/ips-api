const asyncWrapper = require("../middlewares/async");
const { BadRequest, Unauthenticated } = require("../errors");
const { successHandler, bcryptHelper, attrb } = require("../helpers");
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
} = require("../models");

const getAllAgents = asyncWrapper(async (req, res) => {
  console.log(req.user);
  const data = await AgentModel.findAll({
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
  const ids = id.split("--")[0];
  const uuids = id.split("--")[1];
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
    ],
  });

  if (!oneAgent) {
    throw new BadRequest("Aucun agent trouvé");
  }
  return successHandler.Ok(res, oneAgent);
});
module.exports = { getAllAgents, getOneAgent, createAgent };
