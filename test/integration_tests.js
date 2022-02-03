const { expect } = require("chai");
let chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require("express");
let server = require("../index");
const valid_chargers_combination = require('../data/valid_chargers_combination.json');
//const non_valid_chargers_combination = require('./data/non_valid_chargers_combination.json');
//const validJsonData = require('./data/chargers.json');
//assertion

chai.should();
chai.use(chaiHttp);

describe("Tasks API",() =>{

//Test GET

describe("GET valid charger data in each parameter",() =>{
    it ("It should GET all valid chargers models",(done)=>{
        chai.request(server)
        .get("/api/chargers")
        .end((err, response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
            let model = JSON.stringify(response.body[0]).split(",");
            model = model[1];
            model = model.split('"');
            expect(model[3]).to.be.oneOf(['J1772', 'Mennekes', 'GB/T', 'CCS1', 'Chademo', 'CCS2', 'Tesla']);
        
            done();
        });
     });
    
     it ("It should GET all valid chargers levels",(done)=>{
        chai.request(server)
        .get("/api/chargers")
        .end((err, response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
            let level = JSON.stringify(response.body[2]).split(",");
            level = level[2];
            level = level.split(":");
            expect(level[1]).to.be.oneOf(['1', '2', '3']);
        
            done();
        });
     });

     it ("It should GET all valid chargers norms",(done)=>{
        chai.request(server)
        .get("/api/chargers")
        .end((err, response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
            let norm = JSON.stringify(response.body[2]).split(",");
            norm = norm[3];
            norm = norm.split('"');
            expect(norm[3]).to.be.oneOf(['North America', 'Japan', 'Eu', 'China','Non Eu']);
        
            done();
        });
     });


     it ("It should GET all valid chargers types",(done)=>{
        chai.request(server)
        .get("/api/chargers")
        .end((err, response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
            let norm = JSON.stringify(response.body[2]).split(",");
            norm = norm[4];
            norm = norm.split('"');
            expect(norm[3]).to.be.oneOf(['AC', 'DC']);
        
            done();
        });
     });





});



    describe("Charger type and model valid combinations",() =>{
            it ("It should POST and get valid charger type and model combinations",(done)=>{
                const charger= valid_chargers_combination;

                chai.request(server)
                .post("/api/chargers")
                .send(charger)
                .end((err, response)=>{

                    response.should.have.status(200);
                    response.body.should.have.property('model');
                    response.body.should.have.property('type');

                    if (response.body.type == "AC"){
                        expect(response.body.model).to.be.oneOf(["J1772", "Mennekes","GB/T","Tesla"]);
                    }

                    if (response.body.type == "DC"){
                        expect(response.body.model).to.be.oneOf(["CCS1", "Chademo","CCS2","GB/T","Tesla"]);
                    }
                    done();
                });
            });
        });


        describe("Charger level and model valid combinations",() =>{
            it ("It should POST and get valid charger level and model combinations",(done)=>{
                const charger= valid_chargers_combination;
                chai.request(server)
                .post("/api/chargers")
                .send(charger)
                .end((err, response)=>{

                    response.should.have.status(200);
                    response.body.should.have.property('level');
                    response.body.should.have.property('model');

                    if (response.body.level == 1){
                        expect(response.body.model).to.be.oneOf(["J1772", "Tesla"]);
                    }

                    if (response.body.level == 2){
                        expect(response.body.model).to.be.oneOf(["J1772", "Tesla"]);
                    }

                    if (response.body.level == 3){
                        expect(response.body.model).to.be.oneOf(["Mennekes","CCS1", "Chademo","CCS2","GB/T","Tesla"]);
                    }

                    done();
                });
            });
        });


        describe("Charger norm and model valid combinations",() =>{
            it ("It should POST and get valid charger norm and model combinations",(done)=>{
                const charger= valid_chargers_combination;
                chai.request(server)
                .post("/api/chargers")
                .send(charger)
                .end((err, response)=>{

                    response.should.have.status(200);
                    response.body.should.have.property('level');
                    response.body.should.have.property('model');

                    if (response.body.norm == "North America"){
                        expect(response.body.model).to.be.oneOf(["J1772", "CCS1"]);
                    }

                    if (response.body.level == "Japan"){
                        expect(response.body.model).to.be.oneOf(["J1772", "Chademo"]);
                    }

                    if (response.body.level == "Eu"){
                        expect(response.body.model).to.be.oneOf(["Mennekes","CCS2"]);
                    }

                    if (response.body.level == "China"){
                        expect(response.body.model).to.be.oneOf(["GB/T"]);
                    }

                    if (response.body.level == "Non Eu"){
                        expect(response.body.model).to.be.oneOf(["Tesla"]);
                    }

                    done();
                });
            });
        });



});

