const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { BadRequest } = require("../errors");

const uploaderFile = async (file, msg) => {
  //check if files exist
  if (!file) {
    throw new BadRequest(msg.noFile);
  }
  //check if is a pdf files
  const fichierToUpload = file.fichier;
  if (fichierToUpload.mimetype.split("/")[1] !== "pdf") {
    throw new BadRequest(msg.invalideFile);
  }
  const pathMain = path.join(
    __dirname,
    `${process.env.PATH_TO_UPLOAD_FILE}${+new Date().getFullYear()}/`
  );
  if (!fs.existsSync(pathMain)) {
    fs.mkdirSync(pathMain);
  }
  const orignalName = fichierToUpload.name;
  const extension = orignalName.split(".")[1];
  const newNameRandom =
    crypto.randomBytes(16).toString("hex") + new Date().getTime().toString();
  const newName = `${newNameRandom}.${extension}`;
  const imagePath = path.join(pathMain, `${newName}`);
  await fichierToUpload.mv(imagePath);

  return {
    src: process.env.PATH_TO_SAVE + new Date().getFullYear() + "/" + newName,
    name: orignalName,
  };
};

module.exports = uploaderFile;
