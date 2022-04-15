const bcrypt = require("bcryptjs");

const myHashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  return hashPass;
};

module.exports = { myHashPassword };
