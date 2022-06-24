const express = require('express');
const router = express.Router();

const livres = require("../controllers/livre.controller.js");

// Rechercher tous les livres
router.get("/", livres.readAll);

// Ajouter un livre
router.post("/", livres.create);

// Rechercher un livre par son ID
router.get("/:id", livres.readByID);

// Rechercher des livres par son auteur
router.get("/auteur/:author", livres.readByAuthor);

// Mettre à jour un livre par son ID
router.put("/:id", livres.updateByID);

// Supprimer un livre par son ID
router.delete("/:id", livres.deleteByID);

// Supprimer tous les livres
router.delete("/", livres.deleteAll);

module.exports = router;