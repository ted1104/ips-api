const express = require("express");
const router = express.Router();

const { getAllRoles } = require("../controllers/role");

router.route("/").get(getAllRoles);

module.exports = router;
