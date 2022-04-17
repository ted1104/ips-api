const express = require("express");
const router = express.Router();

const { getAllAgents, createAgent } = require("../controllers/agent");

//middleware
const authMiddleware = require("../middlewares/auth");

router
  .route("/")
  .get(authMiddleware, getAllAgents)
  .post(authMiddleware, createAgent);

module.exports = router;
