const express = require("express");
const router = express.Router();
//middleware
const authMiddleware = require("../middlewares/auth");
const { addMateriel, getAllMateriels } = require("../controllers/materiels");

router.route("/").get(authMiddleware, getAllMateriels).post(addMateriel);

module.exports = router;
