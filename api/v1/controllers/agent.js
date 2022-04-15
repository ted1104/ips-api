const asyncWrapper = require("../middlewares/async");
const { BadRequest } = require("../errors");
const { successHandler, bcryptHelper } = require("../helpers");

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
const { hashPassword } = require("../helpers/hash-password");

const getAllAgents = asyncWrapper(async (req, res) => {
  const data = await AgentModel.findAll();
  return successHandler.Ok(res, data);
});

const createAgent = asyncWrapper(async (req, res) => {
  const body = req.body;
  const { matricule } = body;

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

  //check if another username with the same email adress already exist
  const { username } = body.auth;
  const checkingUsername = await AuthModel.findOne({ where: { username } });

  if (checkingUsername) {
    throw new BadRequest(
      "un autre utilisateur avec ce même identifiant de connexion existe déjà"
    );
  }

  //creating agent
  const saved = await AgentModel.create(body);

  //creating authentifications info
  const { id: agentId } = saved;
  const { password } = body.auth;

  const hashedPass = await bcryptHelper.myHashPassword(password);
  const dtAuth = { ...body.auth, agentId, password: hashedPass };
  const savedAuth = await AuthModel.create(dtAuth);

  const msg = "L'agent a été crée avec succès";
  return successHandler.Created(res, saved, msg);
});
module.exports = { getAllAgents, createAgent };
