const express = require("express");
const router = express.Router();

const {
  createOperationBanque,
  getAllOperationBanque,
} = require("../controllers/banque");

//middleware
const authMiddleware = require("../middlewares/auth");

router
  .route("/")
  .get(authMiddleware, getAllOperationBanque)
  .post(authMiddleware, createOperationBanque);

module.exports = router;
