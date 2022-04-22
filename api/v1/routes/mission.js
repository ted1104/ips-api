const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const { getAllMissions, createMission } = require("../controllers/missions");

router
  .route("/")
  .get(authMiddleware, getAllMissions)
  .post(authMiddleware, createMission);

module.exports = router;
