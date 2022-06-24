process.env.NODE_ENV = 'test';

// Ajout du module Chai permettant d'écrire des assertions de test
var chai = require('chai');
// Ajout du module Chai-Http permettant de tester des URL en HTTP
var chaiHttp = require('chai-http');
// Ajout du module gérant le serveur
var app = require('../app');
// Configuration de Chai pour utiliser le style "should"
var should = chai.should();

// Ajout du module gérant le modèle
const Livre = require("../models/livre.model.js");

// Le module Chai utilise le plugin Chai-Http
chai.use(chaiHttp);

describe('Test API : Livre', function() {
    // Vider la DB avant de faire les tests
    before((done)=>{
        Livre.deleteAll(function(){
            done();
            });
        });

    // Tester la récupération de la liste des livres : GET /livres
    describe('Liste des livres (vide)', function(){
        it("GET /livres", function(done){
            chai.request(app)
                .get('/livres')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                done();    
                });
            });
        });

    // Tester l'ajout d'un livre : POST /livres
    describe('Ajouter un livre', function(){
        it("POST /livres - On ne peut pas ajouter un livre sans nom", function(done){
            let livre = {
                auteur:"Hergé",
                annee: 1946
            }
            chai.request(app)
                .post('/livres')
                .send(livre)
                .end(function(err,res){
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql("ER_BAD_NULL_ERROR: Le champ 'nom' ne peut être vide (null)");
                done();  
                });
        });

        it("POST /livres - On ne peut pas ajouter un livre sans auteur", function(done){
            let livre = {
                nom: "Tintin en Amérique",
                annee: 1946
            }
            chai.request(app)
                .post('/livres')
                .send(livre)
                .end(function(err,res){
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql("ER_BAD_NULL_ERROR: Le champ 'auteur' ne peut être vide (null)");
                done();  
                });
        });

        it("POST /livres - On ne peut pas ajouter un livre sans année", function(done){
            let livre = {
                nom: "Tintin en Amérique",
                auteur: "Hergé"
            }
            chai.request(app)
                .post('/livres')
                .send(livre)
                .end(function(err,res){
                    res.should.have.status(500);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql("ER_BAD_NULL_ERROR: Le champ 'annee' ne peut être vide (null)");
                done();  
                });
        });

        it("POST /livres - On peut ajouter un livre", function(done){
            let livre = {
                nom: "Tintin en Amérique",
                auteur: "Hergé",
                annee: 1946
            }
            chai.request(app)
                .post('/livres')
                .send(livre)
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('nom');
                    res.body.should.have.property('nom').eql("Tintin en Amérique");
                    res.body.should.have.property('auteur');
                    res.body.should.have.property('auteur').eql("Hergé");
                    res.body.should.have.property('annee');
                    res.body.should.have.property('annee').eql(1946);
                done();    
                });
        });

        it("GET /livres - Un livre a été ajouté (liste des livres avec 1 livre)", function(done){
            chai.request(app)
                .get('/livres')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                done();    
                });
        });

        it("POST /livres - On peut ajouter un autre livre du même auteur", function(done){
            let livre = {
                nom: "Objectif Lune",
                auteur: "Hergé",
                annee: 1953
            }
            chai.request(app)
                .post('/livres')
                .send(livre)
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('nom');
                    res.body.should.have.property('nom').eql("Objectif Lune");
                    res.body.should.have.property('auteur');
                    res.body.should.have.property('auteur').eql("Hergé");
                    res.body.should.have.property('annee');
                    res.body.should.have.property('annee').eql(1953);
                done();    
                });
        });

    });

/*    
        it("POST /livres - On ne peut pas ajouter un livre déjà existant", function(done){
            let livre = {
                nom: "Tintin en Amérique",
                auteur: "Hergé",
                annee: 1946
            }
        });
*/


    // Tester la récupération de la liste des livres : GET /livres
    describe('Liste des livres (pas vide)', function(){
        it("GET /livres - Un autre livre a été ajouté (liste des livres avec 2 livres)", function(done){
            chai.request(app)
                .get('/livres')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                done();    
                });
            });

    });

    // Tester la récupération des livres d'un auteur : GET /livres/auteur/:author
    describe('Récupérer les livres par son auteur', function(){

        it("GET /livres/auteur/:author - Liste des livres du même auteur", function(done){
            let auteurLivre = "Hergé";
            chai.request(app)
                .get('/livres/auteur/'+auteurLivre)
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                done();    
                });

        });

        it("GET /livres/auteur/:author - Liste des livres d'un auteur inconnu", function(done){
            let auteurLivre = "Simenon";
            chai.request(app)
                .get('/livres/auteur/'+auteurLivre)
                .end(function(err,res){
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('Pas de livre trouvé avec comme auteur : Simenon');
                done();    
                });

        });

    });

    // Tester la récupération d'un livre : GET /livres/:id
    describe('Récupérer un livre avec son ID', function(){

        let idLivre = 0;

        it("POST /livres - On ajoute un livre", function(done){
            let livre = {
                nom: "Le Lotus Bleu",
                auteur: "Hergé",
                annee: 1946
            }
            chai.request(app)
                .post('/livres')
                .send(livre)
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    idLivre = res.body.id;
                    res.body.should.have.property('nom');
                    res.body.should.have.property('nom').eql("Le Lotus Bleu");
                    res.body.should.have.property('auteur');
                    res.body.should.have.property('auteur').eql("Hergé");
                    res.body.should.have.property('annee');
                    res.body.should.have.property('annee').eql(1946);
                done();    
                });
            });

        it("GET /livres/:id - Récupérer un livre avec son ID", function(done){
            let url = '/livres/'+idLivre;
            chai.request(app)
                .get(url)
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id');
                    res.body.should.have.property('id').eql(idLivre);
                    res.body.should.have.property('nom');
                    res.body.should.have.property('nom').eql("Le Lotus Bleu");
                    res.body.should.have.property('auteur');
                    res.body.should.have.property('auteur').eql("Hergé");
                    res.body.should.have.property('annee');
                    res.body.should.have.property('annee').eql(1946);
                done();    
                });
            });

        it("GET /livres/:id - Récupérer un livre avec un ID inconnu", function(done){
            let url = '/livres/0';
            chai.request(app)
                .get(url)
                .end(function(err,res){
                    res.should.have.status(404);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.should.have.property('message').eql('Pas de livre trouvé avec id 0.');
                done();    
                });
            });

        it("GET /livres - plusieurs livres ont été ajoutés (liste des livres avec 3 livres)", function(done){
            chai.request(app)
                .get('/livres')
                .end(function(err,res){
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(3);
                done();    
                });
            });
    
    });
    
});