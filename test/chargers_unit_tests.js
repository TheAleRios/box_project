let chai = require("chai");
let chaiHttp = require("chai-http");
const { response } = require("express");
let server = require("../index");

//assertion

chai.should();
chai.use(chaiHttp);

describe("Tasks API",() =>{

//Test GET

describe("GET api/chargers",() =>{
    it ("It should GET all the chargers",(done)=>{
        chai.request(server)
        .get("/api/chargers")
        .end((err, response)=>{
            response.should.have.status(200);
            response.body.should.be.a('array');
            response.body.length.should.be.eq(3);

            done();
        });
     });

     it ("It should NOT GET all the chargers",(done)=>{
        chai.request(server)
        .get("/api/charg")
        .end((err, response)=>{
            response.should.have.status(404);
            done();
        });
     });

});

describe("GET api/chargers/:id",() =>{
    it ("It should GET a charger by ID",(done)=>{
        const chargerId = 1;
        chai.request(server)
        .get("/api/chargers/"+chargerId)
        .end((err, response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property('id');
            response.body.should.have.property('model');
            response.body.should.have.property('level');
            response.body.should.have.property('norm');
            response.body.should.have.property('type');
            response.body.should.have.property('id').eq(1);
        
            done();
        });
     });

     it ("It should NOT GET a charger by ID",(done)=>{
        const chargerId = 123;
        chai.request(server)
        .get("/api/chargers/"+chargerId)
        .end((err, response)=>{
            response.should.have.status(404);
            response.text.should.be.eq("Charger with provided identifier doesn't exists");
        
            done();
        });
     });
});

        describe("POST api/chargers",() =>{
            it ("It should POST a new charger",(done)=>{
                const charger={
                    "id": 4,
                    "model": "J1772",
                    "level": 1,
                    "norm": "China",
                    "type": "AC"

                };
                chai.request(server)
                .post("/api/chargers")
                .send(charger)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('model');
                    response.body.should.have.property('level');
                    response.body.should.have.property('norm');
                    response.body.should.have.property('type');
                    response.body.should.have.property('id').eq(4);
                    response.body.should.have.property('model').eq("J1772");
                    response.body.should.have.property('level').eq(1);
                    response.body.should.have.property('norm').eq("China");
                    response.body.should.have.property('type').eq("AC");

                    done();
                });
            });
        });


        describe("PUT api/chargers",() =>{
            it ("It should PUT a new charger",(done)=>{
                const chargerID = 1;
                const charger={
                 //   "id": 4,
                    "model": "CCS1",
                    "level": 2,
                    "norm": "Eu",
                    "type": "AC"

                };
                chai.request(server)
                .put("/api/chargers/"+chargerID)
                .send(charger)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id');
                    response.body.should.have.property('model');
                    response.body.should.have.property('level');
                    response.body.should.have.property('norm');
                    response.body.should.have.property('type');
                    response.body.should.have.property('id').eq(1);
                    response.body.should.have.property('model').eq("CCS1");
                    response.body.should.have.property('level').eq(2);
                    response.body.should.have.property('norm').eq("Eu");
                    response.body.should.have.property('type').eq("AC");

                    done();
                });
            });
        });


        describe("PATCH api/chargers",() =>{
            it ("It should PATCH an existing charger",(done)=>{
                const chargerID = 2;
                const charger={
                 //   "id": 4,
                    "model": "Tesla",
                };
                chai.request(server)
                .patch("/api/chargers/"+chargerID)
                .send(charger)
                .end((err, response)=>{
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq(2);
                    response.body.should.have.property('model').eq("Tesla");
                    response.body.should.have.property('level').eq(3);
                    response.body.should.have.property('norm').eq("Eu");
                    response.body.should.have.property('type').eq("AC");

                    done();
                });
            });
        });


        describe("DELETE api/chargers/:id",() =>{
            it ("It should DELETE an existing charger",(done)=>{
                const chargerID = 3;
                chai.request(server)
                .delete("/api/chargers/"+chargerID)
                .end((err, response)=>{
                    response.should.have.status(200);
                    done();
                });
            });

            it ("It should NOT DELETE an existing charger",(done)=>{
                const chargerID = 212;
                chai.request(server)
                .delete("/api/chargers/"+chargerID)
                .end((err, response)=>{
                    response.should.have.status(404);
                    done();
                });
            });
        });


});

