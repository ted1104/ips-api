const express = require("express");
const router = express.Router();

const {
  getAllLigneBudgetaire,
  createLigneBudgetaire,
  getOneLigneBudgetaire,
  createDepenseLigneBudgetaire,
} = require("../controllers/lignebudgetaire");

//middleware
const authMiddleware = require("../middlewares/auth");

router
  .route("/")
  .get(authMiddleware, getAllLigneBudgetaire)
  .post(authMiddleware, createLigneBudgetaire);

router.route("/:id").get(authMiddleware, getOneLigneBudgetaire);
router.route("/add-depense").post(authMiddleware, createDepenseLigneBudgetaire);

module.exports = router;
