const express= require('express');

const EventEmmiter= require('events');


const User= require('../models/user.model');

const router= express.Router();

const { verifyMail, adminMail}= require('../utils');


const eventEmmiter= new EventEmmiter();

let admins= [
    {mail:"admin1@adminMail.com"},
    {mail:"admin1@adminMail.com"},
    {mail:"admin1@adminMail.com"},
    {mail:"admin1@adminMail.com"},
    {mail:"admin1@adminMail.com"}]

router.post("",async(req,res)=>{
    try{
        const user= await User.create(req.body);
        
         eventEmmiter.on("user register", verifyMail)


         eventEmmiter.on("user register", adminMail)

         eventEmmiter.emit("user register",{
             to: user.email,
             subject: `Welcome to ABC system ${user.first_name} ${user.last_name}`,
             text: `Hi ${user.first_name}, Please confirm your email address`,

         });

         eventEmmiter.emit("user register",{
            to: admins[0].mail,
            subject: ` ${user.first_name} ${user.last_name} has registerd with us`,
            text: `Please welcome  ${user.first_name}  ${user.last_name}`,

        });

  res.send('new mail');


    }catch(err){
        res.status(500).send(err.message);
    }
});

router.get("", async(req,res)=>{
    try{
        const page= req.query.page || 1;

        const size= req.query.size || 15;



        const users= await User.find()
        .skip((page-1)*size)
        .limit(size)
        .lean().exec();

        const totalPages= Math.ceil((await User.find().countDocuments())/size);

        return res.send({users, totalPages})

    }catch(err){
        return res.status(500).send({message:err.message});
    }
});

module.exports= router;