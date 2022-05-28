const express = require("express");
const router = express.Router();

const {
  getOneDetailOneRubrique,
  createDepense,
} = require("../controllers/finances");

//middleware
const authMiddleware = require("../middlewares/auth");

// router
//   .route("/")
//   .get(authMiddleware, getAllLigneBudgetaire)
//   .post(authMiddleware, createLigneBudgetaire);

router.route("/rubrique/:id").get(authMiddleware, getOneDetailOneRubrique);
router.route("/add-depense").post(authMiddleware, createDepense);
// router
//   .route("/add-montant-fixe")
//   .post(authMiddleware, createMontantFixeRubrique);

module.exports = router;
