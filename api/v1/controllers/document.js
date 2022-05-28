const asyncWrapper = require("../middlewares/async");
const { BadRequest, Unauthenticated } = require("../errors");
const {
  successHandler,
  bcryptHelper,
  attrb,
  splitid,
  uploaderFile,
} = require("../helpers");
const {
  agentCreateSchemaValidation,
  documentSchemaValidation,
} = require("../validations");
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
  DocumentsModel,
  TypeDocumentModel,
} = require("../models");

const getAllDocuments = asyncWrapper(async (req, res) => {
  const year = new Date().getFullYear();
  const data = await DocumentsModel.findAll({
    where: { year },
    attributes: ["id", "titre", "path", "year"],
    include: [
      {
        model: StructureModel,
        as: "structure_doc",
        attributes: attrb.attr_statique_tables,
      },
      {
        model: TypeDocumentModel,
        as: "type_doc",
        attributes: attrb.attr_statique_tables,
      },
    ],
  });
  return successHandler.Ok(res, data);
});

const createDocument = asyncWrapper(async (req, res) => {
  const body = req.body;
  const validation = documentSchemaValidation.validate(body);
  const { error, value } = validation;
  if (error) {
    throw new BadRequest(error.details[0].message);
  }
  const file = req.files;
  //uploads files config
  const msgs = {
    noFile: "le fichier du document est obligatoire",
    invalideFile: "Svp charger envoyer un fichier valide, un pdf est requis",
  };
  const path = await uploaderFile(file, msgs);
  const { src, name } = path;

  //save data
  const year = new Date().getFullYear();
  let structure = body.structureId;
  if (structure == 0) {
    structure = null;
  }
  console.log("here", structure);
  const data_to_save = { ...body, path: src, structureId: structure, year };
  const savedFile = await DocumentsModel.create(data_to_save);
  const msg = "Le document clé a été bien enregistré";
  return successHandler.Created(res, savedFile, msg);
});

module.exports = { getAllDocuments, createDocument };
