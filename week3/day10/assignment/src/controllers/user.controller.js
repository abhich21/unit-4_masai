const express= require('express');

const { body, validationResult } = require('express-validator');

const User = require('../models/user.model');

const router= express.Router();

router.post(
    "",
    body("id").trim().isNumeric(),
    body("first_name").trim().isLength({min:3, max:30}).isString(),
    body("last_name").trim().isLength({min:3, max:30}).isString(),
    body("pincode").trim().isLength({min:6, max:6}).isNumeric(),
    body("age").isNumeric()
    .custom((value)=>{
        if(value<=0 || value > 100){
            throw new Error('Enter the age between 1-100');
         }
         return true;
    }),
    body("email").isEmail()
    .custom(async(value)=>{
        const user = await User.findOne({email : value});
        if(user){
            throw new Error('E-mail already in use');
        }
        return true;
    }),
    body("gender").trim()
    .custom((value)=>{
        if(value=="Male" || value=="Female" || value=="Others"){
            return true;
         }
         throw new Error("enter a valid gender")
    }),
async(req,res)=>{
    console.log(body("id"));


    try{
        const errors = validationResult(req);
        // errors=[]
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
        const user = await User.create(req.body);

        return res.send(user);
    }catch(err){
        return res.status(500).send({message: err.message})

    }
});

module.exports=router;