const jwt = require("jsonwebtoken");
const { Unauthenticated } = require("../errors");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Unauthenticated("merci de renseigner un token valide !");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const { id, role, structure, agentId } = decoded;
    req.user = { id, role, structure, agentId };
    next();
  } catch (error) {
    throw new Unauthenticated(
      "votre session a été expiré, merci de vous reconnecter !"
    );
  }
};

module.exports = authenticationMiddleware;
