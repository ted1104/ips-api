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

router
  .route("/partenaire")
  .get(authMiddleware, getAllPartenaire)
  .post(authMiddleware, createPartenaire);

router
  .route("/rubrique")
  .get(authMiddleware, getAllRubriques)
  .post(authMiddleware, createRubriques);

router
  .route("/sous-rubrique")
  .get(authMiddleware, getAllSousRubriques)
  .post(authMiddleware, createSousRubriques);

router
  .route("/type-fichier")
  .get(authMiddleware, getAllTypeFichier)
  .post(authMiddleware, createTypeFichier);

router
  .route("/type-document")
  .get(authMiddleware, getAllTypeDocument)
  .post(authMiddleware, createTypeDocument);
module.exports = router;
