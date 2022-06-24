process.env.NODE_ENV = "test";

// Ajout du module Chai permettant d'écrire des assertions de test
const chai = require('chai');
// Ajout du module Chai-Http permettant de tester des URL en HTTP
const chaiHttp = require('chai-http');

// Ajout du module gérant le serveur
const app = require('../app');

// Configuration de Chai pour utiliser le style "should"
const should = chai.should();

// Le module Chai utilise le plugin Chai-Http
chai.use(chaiHttp);

describe('Test API : Accueil', function(){
    describe('Test de la HomePage', function(){
        it("On accède à la page d'accueil", function(done){
            chai.request(app)
                .get('/')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('Bienvenue sur API livres');
                done();
                });
        });
    });
});

