const bcrypt = require("bcryptjs");

const myHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  return hashPass;
};

const myComparedPassword = async (existingPassword, password) => {
  const isMatch = await bcrypt.compare(password, existingPassword);
  return isMatch;
};

module.exports = { myHashPassword, myComparedPassword };
