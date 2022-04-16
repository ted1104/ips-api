const asyncWrapper = require("../middlewares/async");
const { BadRequest } = require("../errors");
const { successHandler, bcryptHelper } = require("../helpers");

const jwt = require("jsonwebtoken");

const login = asyncWrapper((req, res) => {
  const id = new Date().getDate();
  const username = "test";

  const token = jwt.sign({ id, username }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.EXPIRED_IN,
  });
  return successHandler.Ok(res, { token });
});

module.exports = { login };
