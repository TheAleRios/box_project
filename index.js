const { util } = require('chai');
const express = require('express');
const app = express();
const utils = require('./utils/charger-schema.js');
const {modelValidateSchema} = require('./utils/charger-schema');
const bodyParser = require('body-parser');
const validJsonData = require('./data/chargers.json');
const non_validJsonData = require('./data/non_valid_chargers.json');
const non_valid_chargers_combination = require('./data/non_valid_chargers_combination.json');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 



const chargers = validJsonData;

//[]



//GET
app.get("/api/chargers",(request,response)=>{
    response.send(chargers);

});

//GET by id
app.get("/api/chargers/:id",(request,response)=>{
    const chargerId = request.params.id;
    if (!chargerId){ return response.status(404).send("Invalid provided identifier");}
    const charger = chargers.find(charger => charger.id=== parseInt(chargerId));
    if (!charger){ return response.status(404).send("Charger with provided identifier doesn't exists");}
    response.send(charger);

});

//POST
app.post("/api/chargers/",(request,response)=>{
 //  const {error,level} = modelValidateSchema.validate(request.body,{abortEarly:false});
  // const asd = modelValidateSchema.validate(request.body,{abortEarly:false});
//  console.log(error);
   //console.log(request.body.model);
//   if (error) 
   
   
   // var errora = JSON.stringify(error.details);
  //  errora = errora.replace('[{"message":"',"").replace(',"path":["model"],"type":"string.base","context":{"label":"model","value":1,"key":"model"}}]','');
  //  console.log("zzzz"+errora+"zzzzz");

 //  return response.status(400).send(error.details);
   if (request.body.model == null)
     return response.status(400).send("Model parameter is required");

   if (request.body.model != "J1772" && request.body.model != "Mennekes" && request.body.model != "GB/T" && request.body.model != "CCS1" && request.body.model != "Chademo" 
       && request.body.model != "CCS2" && request.body.model != "Tesla")
       return response.status(400).send("Invalid <model> parameter, it should be: J1772, Mennekes, GB/T, CCS1, Chademo, CCS2 or Tesla");
    
   if (request.body.level == null)
   return response.status(400).send("<Level> parameter is required");

   if (request.body.level < 1 || request.body.level > 3)
        return response.status(400).send("<Level> parameter should be 1, 2 or 3");

    if (request.body.norm == null)
        return response.status(400).send("<Norm> parameter is required");

    if (request.body.norm != "Japan" && request.body.norm != "North America" && request.body.norm != "Eu" && request.body.norm != "China" && request.body.norm != "Non Eu" )
        return response.status(400).send("Invalid <norm>, it should be: North America, Japan, Eu, China or Non Eu");

    if (request.body.type == null)
        return response.status(400).send("<type> parameter is required");

    if (request.body.type != "AC" && request.body.type != "DC")
        return response.status(400).send("Invalid <type> parameter, it should be AC or DC");

    response.send(request.body);

    const charger = {

        id: chargers.length+1,
        model: request.body.model,
        level: request.body.level,
        norm: request.body.norm,
        type: request.body.type,

    };
     
     chargers.push(charger);
    //  response.send(chargers);


});




//PUT
app.put("/api/chargers/:id",(request,response)=>{
    const chargerId = request.params.id;
    const charger = chargers.find(charger => charger.id === parseInt(chargerId));   
    if(!charger) return response.status(404).send("The charger with the provided ID does not exists");
    
    ///////

  if (request.body.model == null)
    return response.status(400).send("Model parameter is required");

  if (request.body.model != "J1772" && request.body.model != "Mennekes" && request.body.model != "GB/T" && request.body.model != "CCS1" && request.body.model != "Chademo" 
      && request.body.model != "CCS2" && request.body.model != "Tesla")
      return response.status(400).send("Invalid <model> parameter, it should be: J1772, Mennekes, GB/T, CCS1, Chademo, CCS2 or Tesla");
   
  if (request.body.level == null)
  return response.status(400).send("<Level> parameter is required");

  if (request.body.level < 1 || request.body.level > 3)
       return response.status(400).send("<Level> parameter should be 1, 2 or 3");

   if (request.body.norm == null)
       return response.status(400).send("<Norm> parameter is required");

   if (request.body.norm != "Japan" && request.body.norm != "North America" && request.body.norm != "Eu" && request.body.norm != "China" && request.body.norm != "Non Eu" )
       return response.status(400).send("Invalid <norm>, it should be: North America, Japan, Eu, China or Non Eu");

   if (request.body.type == null)
       return response.status(400).send("<type> parameter is required");

   if (request.body.type != "AC" && request.body.type != "DC")
       return response.status(400).send("Invalid <type> parameter, it should be AC or DC");



    //////


    charger.model = request.body.model;
    charger.level = request.body.level;
    charger.norm = request.body.norm;
    charger.type = request.body.type;




    response.send(charger);

 });



//PATCH
app.patch("/api/chargers/:id",(request,response)=>{
    const chargerId = request.params.id;
    const charger = chargers.find(charger => charger.id === parseInt(chargerId));   
    if(!charger) return response.status(404).send("The charger with the provided ID does not exists");
    
    

    if(request.body.model){
        if (request.body.model != "J1772" && request.body.model != "Mennekes" && request.body.model != "GB/T" && request.body.model != "CCS1" && request.body.model != "Chademo" 
        && request.body.model != "CCS2" && request.body.model != "Tesla")
        return response.status(400).send("Invalid <model> parameter, it should be: J1772, Mennekes, GB/T, CCS1, Chademo, CCS2 or Tesla");
           else {charger.model = request.body.model;}
        
    }
    
    if(request.body.level){
        if (request.body.level < 1 || request.body.level > 3)
       return response.status(400).send("<Level> parameter should be 1, 2 or 3");
       charger.level = request.body.level;
    }


    if(request.body.norm){
        if (request.body.norm != "Japan" && request.body.norm != "North America" && request.body.norm != "Eu" && request.body.norm != "China" && request.body.norm != "Non Eu" )
        return response.status(400).send("Invalid <norm>, it should be: North America, Japan, Eu, China or Non Eu");
        charger.norm = request.body.norm;
    }


    if(request.body.type){
        if (request.body.type != "AC" && request.body.type != "DC")
        return response.status(400).send("Invalid <type> parameter, it should be AC or DC");
        charger.type = request.body.type;

    }



   
  


 


    response.send(charger);

 });



//DELETE
app.delete("/api/chargers/:id",(request,response)=>{
    const chargerId = request.params.id;
    const charger = chargers.find(charger => charger.id === parseInt(chargerId));   
    if(!charger) return response.status(404).send("The charger with the provided ID does not exists");
    
    const index = chargers.indexOf(charger);
    chargers.splice(index, 1);


    response.send(charger);

 });


const port = process.env.PORT || 3000;
module.exports = app.listen(port, () => console.log('Listening on port '+port));