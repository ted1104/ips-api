const express = require("express");
const router = express.Router();

const { getAllDocuments, createDocument } = require("../controllers/document");

//middleware
const authMiddleware = require("../middlewares/auth");

router
  .route("/")
  .get(authMiddleware, getAllDocuments)
  .post(authMiddleware, createDocument);

// router.route("/:id").get(getOneAgent);

module.exports = router;
