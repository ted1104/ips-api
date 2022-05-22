const express = require("express");
const router = express.Router();
//middleware
const authMiddleware = require("../middlewares/auth");
const {
  addMateriel,
  getAllMateriels,
  addInventaire,
  getInventaire,
} = require("../controllers/materiels");

router.route("/").get(authMiddleware, getAllMateriels).post(addMateriel);
router
  .route("/inventaire")
  .post(authMiddleware, addInventaire)
  .get(getInventaire);

module.exports = router;
