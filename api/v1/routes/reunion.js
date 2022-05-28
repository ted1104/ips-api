const express = require("express");
const router = express.Router();

const {
  getAllReunions,
  createReunion,
  createReunionFile,
  getOneReunions,
} = require("../controllers/reunions");

const authMiddleware = require("../middlewares/auth");

router
  .route("/")
  .get(authMiddleware, getAllReunions)
  .post(authMiddleware, createReunion);

router.route("/:id").get(authMiddleware, getOneReunions);
router.route("/upload-file").post(authMiddleware, createReunionFile);

module.exports = router;
