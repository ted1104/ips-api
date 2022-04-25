const sequelize = require("sequelize");

const asyncWrapper = require("../middlewares/async");
const { BadRequest } = require("../errors");
const { successHandler, attrb } = require("../helpers");
const { statiqueTableSchemaValidation } = require("../validations");

const {
  RoleModel,
  GradeModel,
  FonctionModel,
  CategorieProfModel,
  StructureModel,
  ZoneSanteModel,
  AuthModel,
  AgentModel,
  TypeReunionsModel,
  PartenaireModel,
  BanqueOperationModel,
} = require("../models");

/* 
  #########################
  #########################
  #########################
  ####CRUD :===> ROLES ####
*/
const getAllRole = asyncWrapper(async (req, res) => {
  const roles = await RoleModel.findAll({
    attributes: attrb.attr_statique_tables,
  });
  return successHandler.Ok(res, roles);
});

const getOneRole = asyncWrapper(async (req, res, next) => {
  const { id } = req.params;
  const oneRole = await RoleModel.findOne({ raw: true, where: { id } });
  if (!oneRole) {
    throw new BadRequest("No data");
  }
  return successHandler.Ok(res, oneRole);
});

const createRole = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = statiqueTableSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  const checkIfExist = await RoleModel.findOne({ where: body });
  if (checkIfExist) {
    throw new BadRequest("ce rôle existe déjà");
  }
  const data = await RoleModel.create(body);
  const msg = "La rôle a été créé avec succès";
  return successHandler.Created(res, data, msg);
});

/* 
  #########################
  #########################
  #########################
  ### CRUD :===> GRADES ###
*/

const getGrade = asyncWrapper(async (req, res) => {
  const grades = await GradeModel.findAll();
  return successHandler.Ok(res, grades);
});

const createGrade = asyncWrapper(async (req, res) => {
  const data = req.body;
  const validation = statiqueTableSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  //checking if same grade already exist

  const checkIfExist = await GradeModel.findOne({ where: data });
  if (checkIfExist) {
    throw new BadRequest("cette grade existe déjà");
  }
  const grade = await GradeModel.create(data);
  const msg = "La grade a été créée avec succès";
  return successHandler.Created(res, grade, msg);
});

/* 
  #########################
  #########################
  #########################
  ### CRUD :===> FONCTIONS ###
*/

const getFonction = asyncWrapper(async (req, res) => {
  const data = await FonctionModel.findAll();
  return successHandler.Ok(res, data);
});

const createFonction = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = statiqueTableSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  const checkIfExist = await FonctionModel.findOne({ where: body });
  if (checkIfExist) {
    throw new BadRequest("cette fonction existe déjà");
  }
  const data = await FonctionModel.create(body);
  const msg = "La fonction a été créée avec succès";
  return successHandler.Created(res, data, msg);
});

/* 
  #########################
  #########################
  #########################
  ### CRUD :===> CATEGORIE PERSONNELLE ###
*/

const getCategorie = asyncWrapper(async (req, res) => {
  const data = await CategorieProfModel.findAll();
  return successHandler.Ok(res, data);
});

const createCategorie = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = statiqueTableSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  const checkIfExist = await CategorieProfModel.findOne({ where: body });
  if (checkIfExist) {
    throw new BadRequest("cette catégorie personnelle existe déjà");
  }
  const data = await CategorieProfModel.create(body);
  const msg = "La catégorie personnelle a été créée avec succès";
  return successHandler.Created(res, data, msg);
});

/* 
  #########################
  #########################
  #########################
  ### CRUD :===> STRUCTURE ###
*/

const getStructre = asyncWrapper(async (req, res) => {
  const data = await StructureModel.findAll();
  return successHandler.Ok(res, data);
});

const createStructure = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = statiqueTableSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  const checkIfExist = await StructureModel.findOne({ where: body });
  if (checkIfExist) {
    throw new BadRequest("cette structure existe déjà");
  }
  const data = await StructureModel.create(body);
  const msg = "La structure a été créée avec succès";
  return successHandler.Created(res, data, msg);
});

/* 
  #########################
  #########################
  #########################
  ### CRUD :===> ZONE DE SANTE ###
*/

const getZoneSante = asyncWrapper(async (req, res) => {
  const data = await ZoneSanteModel.findAll();
  return successHandler.Ok(res, data);
});

const createZoneSante = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = statiqueTableSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  const checkIfExist = await ZoneSanteModel.findOne({ where: body });
  if (checkIfExist) {
    throw new BadRequest("cette zone de sante existe déjà");
  }
  const data = await ZoneSanteModel.create(body);
  const msg = "La zone de santé a été créée avec succès";
  return successHandler.Created(res, data, msg);
});

/* 
  #########################
  #########################
  #########################
  ### CRUD :===> TYPE REUNION ###
*/

const getTypeReunion = asyncWrapper(async (req, res) => {
  const data = await TypeReunionsModel.findAll();
  return successHandler.Ok(res, data);
});

const createTypeReunion = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = statiqueTableSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  const checkIfExist = await TypeReunionsModel.findOne({ where: body });
  if (checkIfExist) {
    throw new BadRequest("ce type de reunion existe déjà");
  }
  const data = await TypeReunionsModel.create(body);
  const msg = "Le type de reunion a été créée avec succès";
  return successHandler.Created(res, data, msg);
});

/* 
  #########################
  #########################
  #########################
  ### CRUD :===> PARTENAIRE ###
*/

const getAllPartenaire = asyncWrapper(async (req, res) => {
  const data = await PartenaireModel.findAll({
    attributes: ["id", "description", "solde"],
  });
  return successHandler.Ok(res, data);
});

const createPartenaire = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = statiqueTableSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  const checkIfExist = await PartenaireModel.findOne({ where: body });
  if (checkIfExist) {
    throw new BadRequest("ce partenaire existe déjà");
  }
  const data = await PartenaireModel.create(body);
  const msg = "Le partenaire a été crée avec succès";
  return successHandler.Created(res, data, msg);
});

/* 
  #########################
  #########################
  #########################
  ### GET ALL STATIQUE TABLES ###
*/

const getAllStatique = asyncWrapper(async (req, res) => {
  const roles = await RoleModel.findAll({
    attributes: attrb.attr_statique_tables,
  });
  const grades = await GradeModel.findAll({
    attributes: attrb.attr_statique_tables,
  });
  const fonction = await FonctionModel.findAll({
    attributes: attrb.attr_statique_tables,
  });
  const categorie = await CategorieProfModel.findAll({
    attributes: attrb.attr_statique_tables,
  });
  const structure = await StructureModel.findAll({
    attributes: attrb.attr_statique_tables,
  });
  const zonesante = await ZoneSanteModel.findAll({
    attributes: attrb.attr_statique_tables,
  });

  const data = { roles, grades, fonction, categorie, structure, zonesante };
  return successHandler.Ok(res, data);
});

/* 
  #########################
  #########################
  #########################
  ### GET ALL STRUCTURE && AGENT ###
*/

const getStructureAndAgents = async (req, res) => {
  const agent = await AgentModel.findAll({
    attributes: ["id", "nom", "prenom"],
  });
  const structure = await StructureModel.findAll({
    attributes: attrb.attr_statique_tables,
  });
  return successHandler.Ok(res, { agent, structure });
};
module.exports = {
  getAllRole,
  getOneRole,
  createRole,
  getGrade,
  createGrade,
  getFonction,
  createFonction,
  getCategorie,
  createCategorie,
  getStructre,
  createStructure,
  getZoneSante,
  createZoneSante,
  getAllStatique,
  getStructureAndAgents,
  getTypeReunion,
  createTypeReunion,
  getAllPartenaire,
  createPartenaire,
};
