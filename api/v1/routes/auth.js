const express = require("express");
const router = express.Router();

const { login, register } = require("../controllers/auth");
const authMiddleware = require("../middlewares/auth");

router.route("/login").post(login);
router.route("/register").post(authMiddleware, register);

module.exports = router;
