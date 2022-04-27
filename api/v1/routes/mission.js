const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth");

const {
  getAllMissions,
  createMission,
  createMissionFiles,
  getOneMission,
  getAllMissionImParticipated,
  changeMissionStatus,
} = require("../controllers/missions");

router
  .route("/")
  .get(authMiddleware, getAllMissions)
  .post(authMiddleware, createMission);
router
  .route("/mission-participated")
  .get(authMiddleware, getAllMissionImParticipated);
router.route("/:id").get(authMiddleware, getOneMission);
router.route("/upload-file").post(authMiddleware, createMissionFiles);
router.route("/status/:id").patch(authMiddleware, changeMissionStatus);

module.exports = router;
