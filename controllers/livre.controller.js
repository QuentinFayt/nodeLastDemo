const Livre = require("../models/livre.model.js");

// Récupérer tous les livres
exports.readAll = (req,res) => {
    Livre.readAll((err,data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Une erreur s'est produite lors de la recherche des livres"
            });
        } else {
            res.send(data);
        }
    });
}

// Ajouter un livre
exports.create = (req,res) => {
    // Valider la requête
    if (!req.body) {
        res.status(400).send({
            message: "Le contenu ne peut pas être vide !"
        });
    }

    // Créer un livre
    const livre = new Livre({
        nom : req.body.nom,
        auteur : req.body.auteur,
        annee : req.body.annee
    });

    Livre.create(livre, (err, data) => {

      if (err) {
          res.status(500).send({
              message: err.message || "Une erreur s'est produite lors de la création d'un livre"
          });
      } else {
          res.send(data);
      }

    });

};

// Rechercher un livre par son ID
exports.readByID = (req,res) => {
    Livre.readById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Pas de livre trouvé avec id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Une erreur s'est produite en cherchant le livre avec id " + req.params.id
            });
          }
        } else res.send(data);
      });
};

// Rechercher les livres par son auteur
exports.readByAuthor = (req,res) => {
  Livre.readByAuthor(req.params.author, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Pas de livre trouvé avec comme auteur : ${req.params.author}`
          });
        } else {
          res.status(500).send({
            message: "Une erreur s'est produite en cherchant le livre avec comme auteur : " + req.params.author
          });
        }
      } else res.send(data);
    });
};

// Mettre à jour un livre par son ID
exports.updateByID = (req,res) => {
    // Valider la requête
    if (!req.body) {
        res.status(400).send({
          message: "Le contenu ne peut pas être vide !"
        });
      }
    
      Livre.updateById(
        req.params.id,
        new Livre(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Pas de livre trouvé avec id ${req.params.id}.`
              });
            } else {
              res.status(500).send({
                message: "Une erreur s'est produite en mettant à jour le livre avec id " + req.params.id
              });
            }
          } else res.send(data);
        }
      );
};

// Supprimer un livre par son ID
exports.deleteByID = (req,res) => {
    Livre.deleteById(req.params.id, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Pas de livre trouvé avec id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Une erreur s'est produite en supprimant le livre avec id " + req.params.id
            });
          }
        } else res.send({ message: `Le livre a été supprimé avec succès !` });
      });
};

// Supprimer tous les livres
exports.deleteAll = (req, res) => {
    Livre.deleteAll((err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Une erreur s'est produite en supprimant tous les livres."
        });
      }
      else res.send({ message: `Tous les livres ont été supprimés avec succès !` });
    });
  };
