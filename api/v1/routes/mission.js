const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const {
  getAllMissions,
  createMission,
  createMissionFiles,
} = require("../controllers/missions");

router
  .route("/")
  .get(authMiddleware, getAllMissions)
  .post(authMiddleware, createMission);
router.route("/upload-file").post(authMiddleware, createMissionFiles);

module.exports = router;
