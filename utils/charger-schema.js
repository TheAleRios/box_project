//const { request } = require('chai');
const Joi = require('joi');


const modelValidateSchema=Joi.object({
    model: Joi.string().required().messages({
        'string.base': `<model> should be a String`,
        'any.required': `<model> is a required field`

    }),
    level: Joi.number().ruleset.min(1).max(3).rule({ message: 'Number must be between 1 and 3' }).required(),
    level: Joi.number(),
    norm: Joi.string(),
    type: Joi.string(),
});
//const levelValidateSchema=Joi.object({model: Joi.string(),level: Joi.number().required(),level: Joi.number(),norm: Joi.string(),type: Joi.string(),});
//const normValidateSchema=Joi.object({model: Joi.string(),level: Joi.number().required(),level: Joi.number(),norm: Joi.string(),type: Joi.string(),});

//module.exports.chargerSchema = chargerSchema;
module.exports = {

    modelValidateSchema//, levelValidateSchema, normValidateSchema


}






//const chargerSchema = Joi.object({
    
  //  model: Joi.string().min(3).required(),
 //   level: Joi.number(),
 //   norm: Joi.string().min(5).required(),
//    type: Joi.string().min(5).required(),


//)}; 


 //   const validation = chargerSchema.validation(request.body);


   // const{error} = chargerSchema.validate(req,res);


 //exports.validateCharger = (charger) => chargerSchema.validate(charger);
 
 
 
 //Joi.validate(charger, chargerSchema);

