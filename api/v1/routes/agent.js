const express = require("express");
const router = express.Router();

const { getAllAgents, createAgent } = require("../controllers/agent");

router.route("/").get(getAllAgents).post(createAgent);

module.exports = router;
