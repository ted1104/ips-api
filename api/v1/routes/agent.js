const express = require("express");
const router = express.Router();

const {
  getAllAgents,
  createAgent,
  getOneAgent,
} = require("../controllers/agent");

//middleware
const authMiddleware = require("../middlewares/auth");

router
  .route("/")
  .get(authMiddleware, getAllAgents)
  .post(authMiddleware, createAgent);

router.route("/:id").get(getOneAgent);

module.exports = router;
