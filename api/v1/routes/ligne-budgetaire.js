const express = require("express");
const router = express.Router();

const {
  getAllLigneBudgetaire,
  createLigneBudgetaire,
} = require("../controllers/lignebudgetaire");

//middleware
const authMiddleware = require("../middlewares/auth");

router
  .route("/")
  .get(authMiddleware, getAllLigneBudgetaire)
  .post(authMiddleware, createLigneBudgetaire);

module.exports = router;
