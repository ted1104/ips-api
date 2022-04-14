const express = require("express");
const router = express.Router();

const {
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
} = require("../controllers/crud-statique");

router.route("/role").get(getAllRole).post(createRole);
router.route("/role/:id").get(getOneRole);

router.route("/grade").get(getGrade).post(createGrade);
router.route("/fonction").get(getFonction).post(createFonction);
router.route("/catpersonnelle").get(getCategorie).post(createCategorie);
router.route("/structure").get(getStructre).post(createStructure);
router.route("/zone-sante").get(getZoneSante).post(createZoneSante);

module.exports = router;
