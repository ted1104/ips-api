const asyncWrapper = require("../middlewares/async");
const { BadRequest } = require("../errors");
const { successHandler, bcryptHelper } = require("../helpers");

//validation
const {
  loginSchemaValidation,
  registerSchemaValidation,
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
} = require("../models");

const jwt = require("jsonwebtoken");

const login = asyncWrapper(async (req, res) => {
  const data = req.body;

  const validation = loginSchemaValidation.validate(data);
  const { value, error } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  //find user if exist
  const { username, password } = data;
  const existUser = await AuthModel.findOne({
    where: { username },
    include: [
      {
        model: AgentModel,
        as: "agent_detail_id",
      },
      {
        model: RoleModel,
        as: "role_detail_id",
        attributes: ["id", "description"],
      },
    ],
  });

  if (!existUser) {
    throw new BadRequest(
      "Le nom d'utilisateur ou le mot de passe est incorrect"
    );
  }

  //checking if password match
  const existingPassword = existUser.password;
  const matchingPassword = await bcryptHelper.myComparedPassword(
    existingPassword,
    password
  );

  if (!matchingPassword) {
    throw new BadRequest(
      "Le nom d'utilisateur ou le mot de passe est incorrect"
    );
  }

  // creating token
  const { id, roleId: role, agent_detail_id } = existUser;
  const token = jwt.sign(
    {
      id,
      role,
      structure: agent_detail_id.structureId,
      agentId: agent_detail_id.id,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.EXPIRED_IN,
    }
  );
  return successHandler.Ok(res, { token: token, user: existUser });
});

const register = asyncWrapper(async (req, res) => {
  const body = req.body;

  //validation
  const validation = registerSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  //check if another username with the same email adress already exist
  const { username, password, agentId } = body;
  const checkingUsername = await AuthModel.findOne({ where: { username } });

  if (checkingUsername) {
    throw new BadRequest(
      "un autre utilisateur avec ce même nom d'utilisateur existe déjà"
    );
  }

  //checking if this agent exit
  const checkingAgent = await AgentModel.findOne({
    where: {
      id: agentId,
    },
  });

  if (!checkingAgent) {
    throw new BadRequest(
      "l'agent a qui vous tentez de créer un compte n'existe pas"
    );
  }

  //checking if agent has another account
  const checkingAnotherAccountExist = await AuthModel.findOne({
    where: {
      agentId,
    },
  });
  if (checkingAnotherAccountExist) {
    throw new BadRequest("Cet agent possède déjà un compte de connexion");
  }

  //creating authentifications info
  //hash password before saving data auth for user
  const hashedPass = await bcryptHelper.myHashPassword(password);
  const dtAuth = { ...body, password: hashedPass };
  await AuthModel.create(dtAuth);

  const msg = "Le compte a été bien crée";
  return successHandler.Created(res, body, msg);
});

module.exports = { login, register };
