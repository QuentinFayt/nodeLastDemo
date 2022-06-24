const mysql = require("mysql");
const dbConfig = require("../config/dbconfig.js");  // fichier de configuration de la DB

//console.log(dbConfig);

// Création de la connexion avec la DB
// 1. Chargement de la configuration pour la connection
const connection = mysql.createConnection({
    host : dbConfig.db.host,
    user: dbConfig.db.user,
    password: dbConfig.db.password,
    database: dbConfig.db.database,
    port: dbConfig.db.port
});

// 2. Ouverture de la connexion
connection.connect(function(error){
    if (error) throw error;         // si erreur de connexion, ça s'arrête ici
    console.log("Connecté avec succès à la base de données " + dbConfig.db.database + " !");
});

// On exporte pour les autres modules, la connexion à la base de données
module.exports = connection;