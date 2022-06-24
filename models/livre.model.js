const sql = require("./db.js");

// Constructeur
const Livre = function(livre) {
    this.nom = livre.nom;
    this.auteur = livre.auteur;
    this.annee = livre.annee;
};

// Méthode pour lire tous les livres dans la DB
Livre.readAll = function(resultat) {
    sql.query("SELECT * FROM livres", (err,res) => {
        if (err) {
            resultat(err, null);
            return;
        }
        resultat(null, res);
    });
};

// Méthode pour ajouter un livre
Livre.create = function(newBook, resultat){
    sql.query("INSERT INTO livres(nom,auteur,annee) VALUES(?,?,?)", [newBook.nom,newBook.auteur,newBook.annee], (err,res) => {
        if (err) {
            resultat(err, null);
            return;
        }
        resultat(null, { id: res.insertId, ...newBook});
    });
}

// Méthode pour rechercher un livre par son ID
Livre.readById = function(id, resultat) {
    sql.query(`SELECT * FROM livres WHERE id = ${id}`, (err, res) => {
        if (err) {
          resultat(err, null);
          return;
        }
    
        if (res.length) {
          resultat(null, res[0]);
          return;
        }
    
        // Pas de livre trouvé avec cet ID
        resultat({ kind: "not_found" }, null);
      });
}

// Méthode pour rechercher un livre par son auteur
Livre.readByAuthor = function(author, resultat) {
  sql.query(`SELECT * FROM livres WHERE auteur="${author}";`, (err, res) => {
      if (err) {
        resultat(err, null);
        return;
      }
  
      if (res.length) {
        resultat(null, res);
        return;
      }
  
      // Pas de livre trouvé avec cet auteur
      resultat({ kind: "not_found" }, null);
    });
}

// Méthode pour mettre à jour un livre par son ID
Livre.updateById = function(id, livre, resultat) {
    sql.query(
        "UPDATE livres SET nom= ?, auteur= ?, annee= ? WHERE id = ?",
        [livre.nom, livre.auteur, livre.annee, id],
        (err, res) => {
          if (err) {
            resultat(err, null);
            return;
          }
    
          if (res.affectedRows == 0) {
            // Pas de livre trouvé avec cet ID
            resultat({ kind: "not_found" }, null);
            return;
          }
    
          resultat(null, { id: id, ...livre });
        }
      );  
}

// Méthode pour supprimer un livre par son ID
Livre.deleteById = function(id, resultat) {
    sql.query("DELETE FROM livres WHERE id = ?", id, (err, res) => {
        if (err) {
          resultat(err, null);
          return;
        }
    
        if (res.affectedRows == 0) {
          // Pas de livre trouvé avec cet ID
          resultat({ kind: "not_found" }, null);
          return;
        }
    
        resultat(null, res);
      });
}

// Méthode pour supprimer tous les livres
Livre.deleteAll = (resultat) => {
    sql.query("DELETE FROM livres", (err,res) => {
      if (err) {
        //console.log("error: ", err);
        resultat(null, err);
        return;
      }
      //console.log(`${res.affectedRows} livres supprimés !`);
      resultat(null, res);
    });
};


module.exports = Livre;