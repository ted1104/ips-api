const sequelize = require("sequelize");

const asyncWrapper = require("../middlewares/async");
const { BadRequest } = require("../errors");
const { successHandler, attrb } = require("../helpers");
const {
  statiqueTableSchemaValidation,
  sousRubriqueTableSchemaValidation,
} = require("../validations");

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
  RubriquesModel,
  TypeFichierModel,
  SousRubriquesModel,
  TypeDocumentModel,
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
  const body = req.body;
  const validation = statiqueTableSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  //checking if same grade already exist

  const checkIfExist = await GradeModel.findOne({ where: body });
  if (checkIfExist) {
    throw new BadRequest("cette grade existe déjà");
  }
  const grade = await GradeModel.create(body);
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
  const data = await StructureModel.findAll({
    attributes: attrb.attr_statique_tables,
  });
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
  ### CRUD :===> TYPE DOCUMENT ###
*/

const getAllTypeDocument = asyncWrapper(async (req, res) => {
  const data = await TypeDocumentModel.findAll({
    attributes: attrb.attr_statique_tables,
  });
  return successHandler.Ok(res, data);
});

const createTypeDocument = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = statiqueTableSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  const checkIfExist = await TypeDocumentModel.findOne({ where: body });
  if (checkIfExist) {
    throw new BadRequest("ce type de document existe déjà");
  }
  const data = await TypeDocumentModel.create(body);
  const msg = "Le type de document a été créée avec succès";
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
  ### CRUD :===> RUBRIQUE FINANCE ###
*/

const getAllRubriques = asyncWrapper(async (req, res) => {
  const data = await RubriquesModel.findAll({
    attributes: ["id", "uuid", "description"],
    include: [
      {
        model: SousRubriquesModel,
        as: "sous_rubriques",
        attributes: attrb.attr_statique_tables,
      },
    ],
  });
  return successHandler.Ok(res, data);
});

const createRubriques = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = statiqueTableSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  const checkIfExist = await RubriquesModel.findOne({ where: body });
  if (checkIfExist) {
    throw new BadRequest("cette rubrique existe déjà");
  }
  const data = await RubriquesModel.create(body);
  const msg = "La rubrique a été crée avec succès";
  return successHandler.Created(res, data, msg);
});

/* 
  #########################
  #########################
  #########################
  ### CRUD :===> SOUS RUBRIQUE FINANCE ###
*/

const getAllSousRubriques = asyncWrapper(async (req, res) => {
  const data = await SousRubriquesModel.findAll({
    attributes: ["id", "description", "rubriqueId"],
  });
  return successHandler.Ok(res, data);
});

const createSousRubriques = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = sousRubriqueTableSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  const checkIfExist = await SousRubriquesModel.findOne({ where: body });
  if (checkIfExist) {
    throw new BadRequest("cette sous rubrique existe déjà");
  }
  const data = await SousRubriquesModel.create(body);
  const msg = "La sous rubrique a été crée avec succès";
  return successHandler.Created(res, data, msg);
});

/* 
  #########################
  #########################
  #########################
  ### CRUD :===> PARTENAIRE ###
*/

const getAllTypeFichier = asyncWrapper(async (req, res) => {
  const data = await TypeFichierModel.findAll({
    attributes: ["id", "description"],
  });
  return successHandler.Ok(res, data);
});

const createTypeFichier = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = statiqueTableSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }

  const checkIfExist = await TypeFichierModel.findOne({ where: body });
  if (checkIfExist) {
    throw new BadRequest("ce partenaire existe déjà");
  }
  const data = await TypeFichierModel.create(body);
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
  const partenaire = await PartenaireModel.findAll({
    attributes: attrb.attr_statique_tables,
  });
  return successHandler.Ok(res, { agent, structure, partenaire });
};

/* 
  #########################
  #########################
  #########################
  ### GET ALL BUREAU && TYPE DOCUMENT ###
*/
const getStructureAndTypeDocument = async (req, res) => {
  const structure = await StructureModel.findAll({
    attributes: attrb.attr_statique_tables,
  });
  const type_document = await TypeDocumentModel.findAll({
    attributes: attrb.attr_statique_tables,
  });
  return successHandler.Ok(res, { structure, type_document });
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
  getAllRubriques,
  createRubriques,
  getAllTypeFichier,
  createTypeFichier,
  getAllSousRubriques,
  createSousRubriques,
  getAllTypeDocument,
  createTypeDocument,
  getStructureAndTypeDocument,
};
