const attr_get_one_agent = [
  "id",
  "uuid",
  "nom",
  "prenom",
  "sexe",
  "matricule",
  "num_cnom_cnop_cnoi",
  "niveau_etudes",
  "ref_affectation",
  "ref_arret_admis_status",
  "salaire",
  "primes",
  "dob",
  "date_engagement",
  "status",
];
const attr_statique_tables = ["id", "description"];
const attr_statique_status = ["id", "description", "color"];
const attr_missions = [
  "id",
  "uuid",
  "nom",
  "date_debut",
  "date_create",
  "createdAt",
];
module.exports = {
  attr_get_one_agent,
  attr_statique_tables,
  attr_missions,
  attr_statique_status,
};
