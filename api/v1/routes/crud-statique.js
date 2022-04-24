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
  getAllStatique,
  getStructureAndAgents,
  getTypeReunion,
  createTypeReunion,
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

router.route("/all-statique").get(authMiddleware, getAllStatique);
router
  .route("/all-agent-all-structure")
  .get(authMiddleware, getStructureAndAgents);

router
  .route("/type-reunion")
  .get(authMiddleware, getTypeReunion)
  .post(authMiddleware, createTypeReunion);

module.exports = router;
