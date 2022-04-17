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

const authMiddleware = require("../middlewares/auth");

router
  .route("/role")
  .get(authMiddleware, getAllRole)
  .post(authMiddleware, createRole);
router.route("/role/:id").get(authMiddleware, getOneRole);

router
  .route("/grade")
  .get(authMiddleware, getGrade)
  .post(authMiddleware, createGrade);
router
  .route("/fonction")
  .get(authMiddleware, getFonction)
  .post(authMiddleware, createFonction);
router
  .route("/catpersonnelle")
  .get(authMiddleware, getCategorie)
  .post(authMiddleware, createCategorie);
router
  .route("/structure")
  .get(authMiddleware, getStructre)
  .post(authMiddleware, createStructure);
router
  .route("/zone-sante")
  .get(authMiddleware, getZoneSante)
  .post(authMiddleware, createZoneSante);

module.exports = router;
