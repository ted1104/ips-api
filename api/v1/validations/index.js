const Joi = require("joi");

const loginSchemaValidation = Joi.object().keys({
  username: Joi.string().required().messages({
    "string.empty": "le nom d'utilisateur ne doit pas être vide",
    "any.required": "le nom d'utilisateur est obligatoire",
  }),
  password: Joi.string().required().messages({
    "string.empty": "le mot de passe ne doit pas être vide",
    "any.required": "le mot de passe est obligatoire",
  }),
});

module.exports = { loginSchemaValidation };
