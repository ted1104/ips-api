const express = require("express");
const router = express.Router();

const { getDashboardData } = require("../controllers/dashboard");
//middleware
const authMiddleware = require("../middlewares/auth");
router.route("/").get(authMiddleware, getDashboardData);

module.exports = router;
