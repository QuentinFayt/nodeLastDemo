const env = process.env;

/* Pendant le développement, on utilise aussi la base de données de test */
env.NODE_ENV="test";

/* Si on n'est pas en mode "production", alors on lit les paramètres dans le fichier .env */
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

let dbname;   // choisir la base de données à utiliser selon qu'on est en test ou en production

if (env.NODE_ENV == "test") {
  dbname = env.DB_TEST; // DB pour les tests
} else {
  dbname = env.DB_NAME; // DB pour la production
}


const dbconfig = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PWD,
    database: dbname,
    port: env.DB_PORT
  }
};
  
module.exports = dbconfig;