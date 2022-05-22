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

const agentCreateSchemaValidation = Joi.object().keys({
  nom: Joi.string().required().messages({
    "string.empty": "le nom de l'agent ne doit pas être vide",
    "any.required": "le nom de l'agent est obligatoire",
  }),
  prenom: Joi.string().required().messages({
    "string.empty": "le prenom de l'agent ne doit pas être vide",
    "any.required": "le prenom de l'agent est obligatoire",
  }),
  sexe: Joi.number().integer().required().messages({
    "number.empty": "le sexe de l'agent ne doit pas être vide",
    "number.base": "le sexe de l'agent ne doit pas être vide",
    "any.required": "le sexe de l'agent est obligatoire",
  }),
  matricule: Joi.string().required().messages({
    "string.empty": "le matricule de l'agent ne doit pas être vide",
    "any.required": "le matricule de l'agent est obligatoire",
  }),
  gradeId: Joi.number().required().messages({
    "number.base": "la grade de l'agent ne doit pas être vide",
    "any.required": "la grade de l'agent est obligatoire",
  }),
  fonctionId: Joi.number().required().messages({
    "number.base": "la fonction de l'agent ne doit pas être vide",
    "any.required": "la fonction de l'agent est obligatoire",
  }),
  niveau_etudes: Joi.string().required().messages({
    "string.empty": "le niveau d'étude de l'agent ne doit pas être vide",
    "any.required": "le niveau d'étude de l'agent est obligatoire",
  }),
  num_cnom_cnop_cnoi: Joi.string().allow(null, ""),
  catProfId: Joi.number().required().messages({
    "number.base":
      "la categorie professionnelle de l'agent ne doit pas être vide",
    "any.required": "la categorie professionnelle de l'agent est obligatoire",
  }),

  ref_affectation: Joi.string().required().messages({
    "string.empty":
      "la référence d'affectation de l'agent ne doit pas être vide",
    "any.required": "le référence d'affectation de l'agent est obligatoire",
  }),
  ref_arret_admis_status: Joi.string().allow(null, ""),
  structureId: Joi.number().required().messages({
    "number.base": "la structure de l'agent ne doit pas être vide",
    "any.required": "la structure d'affectation de l'agent est obligatoire",
  }),
  zonesanteId: Joi.number().required().messages({
    "number.base": "la zone de santé de l'agent ne doit pas être vide",
    "any.required": "la zone de santé de l'agent est obligatoire",
  }),
  salaire: Joi.string().required().messages({
    "string.empty": "le salaire de l'agent ne doit pas être vide",
    "any.required": "le salaire de l'agent est obligatoire",
  }),
  primes: Joi.string().required().messages({
    "string.empty": "la prime  de l'agent ne doit pas être vide",
    "any.required": "la prime de l'agent est obligatoire",
  }),
  dob: Joi.date().required().messages({
    "date.base": "la date de naissance  de l'agent ne doit pas être vide",
    "any.required": "la date de naissance est obligatoire",
  }),
  dob: Joi.date().required().messages({
    "date.base": "la date de naissance  de l'agent ne doit pas être vide",
    "any.required": "la date de naissance est obligatoire",
  }),
  date_engagement: Joi.date().required().messages({
    "date.base": "la date d'engagement  de l'agent ne doit pas être vide",
    "any.required": "la date d'engagement est obligatoire",
  }),
});

const registerSchemaValidation = Joi.object().keys({
  username: Joi.string().required().messages({
    "string.empty": "le nom d'utilisateur est obligatoire",
    "any.required": "le nom d'utilisateur est obligatoire",
  }),
  password: Joi.string().required().messages({
    "string.empty": "le mot de passe d'utilisateur est obligatoire",
    "any.required": "le mot de passe d'utilisateur est obligatoire",
  }),
  roleId: Joi.number().required().messages({
    "number.base": "le rôle de l'utilisateur est obligatoire",
    "number.empty": "le rôle de l'utilisateur est obligatoire",
    "any.required": "le rôle de l'utilisateur est obligatoire",
  }),
  agentId: Joi.number().required().messages({
    "number.base": "l'id de l'agent est obligatoire",
    "number.empty": "l'id de l'agent est obligatoire",
    "any.required": "l'id de l'agent est obligatoire",
  }),
});

const missionSchemaValidation = Joi.object().keys({
  nom: Joi.string().required().messages({
    "string.empty": "le nom de la mission est obligatoire",
    "any.required": "le nom de la mission est obligatoire",
  }),
  agents: Joi.array()
    .required()
    .items(
      Joi.object()
        .required()
        .keys({
          agentId: Joi.number().required().messages({
            "number.base":
              "un ou plusieurs participants à la mission sont obligatoire",
            "number.empty":
              "un ou plusieurs participants à la mission sont obligatoire",
            "any.required": "les participants à la mission sont obligatoire",
          }),
        })
    )
    .messages({
      "array.base":
        "un ou plusieurs participants à la mission sont obligatoire",
      "array.includesRequiredUnknowns":
        "un ou plusieurs participants à la mission sont obligatoire",
      "any.required":
        "un ou plusieurs participants à la mission sont obligatoire",
    }),
  date_debut: Joi.date().required().messages({
    "date.base": "la date du debut de la mission est obligatoire",
    "any.required": "la date du debut de la mission est obligatoire",
  }),
  structureId: Joi.number().required().messages({
    "number.base": "cette mission doit être affecté à une structure",
    "any.required": "cette mission doit être affecté à une structure",
  }),
  partenaireId: Joi.number().required().messages({
    "number.base": "la source de fond de cette mission est obligatoire",
    "any.required": "la source de fond de cette mission est obligatoire",
  }),
});

const fichierMissionSchemaValidation = Joi.object().keys({
  missionId: Joi.number().required().messages({
    "number.base": "Veuillez selectionner une mission",
    "any.required": "Veuillez selectionner une mission",
  }),
  typefichierId: Joi.number().required().messages({
    "number.base": "le type de fichier est obligatoire",
    "any.required": "le type de fichier est obligatoire",
  }),
  name_fichier: Joi.string().required().messages({
    "string.empty": "le nom du fichier est obligatoire",
    "any.required": "le nom du fichier est obligatoire",
  }),
});

const filterIntervalSchemaValidation = Joi.object().keys({
  date_debut: Joi.date().required().messages({
    "date.base": "la date du debut du filtre est obligatoire",
    "any.required": "la date du debut du filtre est obligatoire",
  }),
  date_fin: Joi.date().required().messages({
    "date.base": "la date de la fin du filtre est obligatoire",
    "any.required": "la date de la fin du filtre est obligatoire",
  }),
});
const reunionSchemaValidation = Joi.object().keys({
  titre: Joi.string().required().messages({
    "string.base": "le titre de la reunion est obligatoire",
    "string.empty": "le titre de la reunion est obligatoire",
    "any.required": "le titre de la reunion est obligatoire",
  }),
  typeReunionId: Joi.number().required().messages({
    "number.base": "Veuillez selectionner le type de la reunion",
    "any.required": "Veuillez selectionner le type de la reunion",
  }),
  date_reunion: Joi.date().required().messages({
    "date.base": "la date de la reunion est obligatoire",
    "any.required": "la date de la reunion est obligatoire",
  }),
  date_adoption: Joi.date().required().messages({
    "date.base": "la date de l'adoption la reunion est obligatoire",
    "any.required": "la date de l'adoption la reunion est obligatoire",
  }),
  created_by: Joi.number().required().messages({
    "number.base": "il semblerait que votre session est deja expiré",
    "any.required": "il semblerait que votre session est deja expiré",
  }),
});

const fichierReunionSchemaValidation = Joi.object().keys({
  reunionId: Joi.number().required().messages({
    "number.base": "Veuillez selectionner une reunion",
    "any.required": "Veuillez selectionner une reunion",
  }),
  typefichierId: Joi.number().required().messages({
    "number.base": "le type de fichier est obligatoire",
    "any.required": "le type de fichier est obligatoire",
  }),
  name_fichier: Joi.string().required().messages({
    "string.empty": "le nom du fichier est obligatoire",
    "any.required": "le nom du fichier est obligatoire",
  }),
});

const sousRubriqueTableSchemaValidation = Joi.object().keys({
  rubriqueId: Joi.number().required().messages({
    "number.base": "la rubrique est obligatoire",
    "any.required": "la rubrique est obligatoire",
  }),
  description: Joi.string().required().messages({
    "string.empty": "la description est obligatoire",
    "any.required": "la description est obligatoire",
  }),
});
const statiqueTableSchemaValidation = Joi.object().keys({
  description: Joi.string().required().messages({
    "string.empty": "la description est obligatoire",
    "any.required": "la description est obligatoire",
  }),
});

const operationBanqueSchemaValidation = Joi.object().keys({
  typeOperationId: Joi.number().required().messages({
    "number.base": "le type de l'operation est obligatoire",
    "any.required": "le type de l'operation est obligatoire",
  }),
  partenaireId: Joi.number().required().messages({
    "number.base": "le partenaire est obligatoire",
    "any.required": "le partenaire est obligatoire",
  }),
  montant: Joi.number().required().messages({
    "number.base": "le montant est obligatoire",
    "any.required": "le montant est obligatoire",
  }),
  motif: Joi.string().required().messages({
    "string.empty": "la motif de l'operation est obligatoire",
    "any.required": "la motif de l'operation obligatoire",
  }),
});

const ligneBudgetaireSchemaValidation = Joi.object().keys({
  description: Joi.string().required().messages({
    "string.empty": "la description de la ligne budgetaire est obligatoire",
    "any.required": "la description de la ligne budgetaire est obligatoire",
  }),

  partenaireId: Joi.number().required().messages({
    "number.base": "le partenaire est obligatoire",
    "any.required": "le partenaire est obligatoire",
  }),
  montant: Joi.number().required().messages({
    "number.base": "le montant loué à cette ligne budgetaire est obligatoire",
    "any.required": "le montant loué à cette ligne budgetaire est obligatoire",
  }),
});

const depenseSchemaValidation = Joi.object().keys({
  sousRubriqueId: Joi.number().required().messages({
    "number.base": "la sous rubrique est obligatoire",
    "any.required": "la sous rubriqueId est obligatoire",
  }),
  partenaireId: Joi.number().required().messages({
    "number.base": "le partenaire est obligatoire",
    "any.required": "le partenaire est obligatoire",
  }),
  montant: Joi.number().required().messages({
    "number.base": "le montant depensé est obligatoire",
    "any.required": "le montant depensé obligatoire",
  }),
  motif: Joi.string().required().messages({
    "string.empty": "le motif est obligatoire",
    "any.required": "le motif est obligatoire",
  }),
});

const rubriqueFixeMontantSchemaValidation = Joi.object().keys({
  rubriqueId: Joi.number().required().messages({
    "number.base": "la rubrique est obligatoire",
    "any.required": "la rubriqueId est obligatoire",
  }),
  ligneBudgetaireId: Joi.number().required().messages({
    "number.base": "la ligne budgetaire est obligatoire",
    "any.required": "la ligne budgetaire est obligatoire",
  }),
  montant: Joi.number().required().messages({
    "number.base": "le montant depensé est obligatoire",
    "any.required": "le montant depensé obligatoire",
  }),
});

const sanctionSchemaValidation = Joi.object().keys({
  missionId: Joi.number().required().messages({
    "number.base": "la mission à sanctionner est obligatoire",
    "any.required": "la mission à sanctionner est obligatoire",
  }),
  description: Joi.string().required().trim().messages({
    "string.empty": "la description de la sanction est obligatoire",
    "string.trim": "la description de la sanction est obligatoire",
    "any.required": "la description de la sanction est obligatoire",
  }),
  created_by: Joi.number().required().messages({
    "number.base": "le createur de la sanction est obligatoire",
    "any.required": "le createur de la sanction est obligatoire",
  }),
});
// const uploadfilesMissionValidation = Joi.f
module.exports = {
  loginSchemaValidation,
  agentCreateSchemaValidation,
  registerSchemaValidation,
  missionSchemaValidation,
  fichierMissionSchemaValidation,
  filterIntervalSchemaValidation,
  reunionSchemaValidation,
  fichierReunionSchemaValidation,
  statiqueTableSchemaValidation,
  operationBanqueSchemaValidation,
  ligneBudgetaireSchemaValidation,
  depenseSchemaValidation,
  rubriqueFixeMontantSchemaValidation,
  sanctionSchemaValidation,
  sousRubriqueTableSchemaValidation,
};
