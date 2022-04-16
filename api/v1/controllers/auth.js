const asyncWrapper = require("../middlewares/async");
const { BadRequest } = require("../errors");
const { successHandler, bcryptHelper } = require("../helpers");

//validation
const { loginSchemaValidation } = require("../validations");

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
  const { id } = existUser;
  const token = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRED_IN,
  });
  return successHandler.Ok(res, { token: token, existUser });
});

module.exports = { login };
