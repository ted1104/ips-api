const express = require("express");
const router = express.Router();

const { getAllRole, getOneRole } = require("../controllers/crud-statique");

router.route("/role").get(getAllRole);
router.route("/role/:id").get(getOneRole);

module.exports = router;
