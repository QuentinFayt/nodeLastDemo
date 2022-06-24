var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({message: 'Bienvenue sur API livres'});
});

module.exports = router;
