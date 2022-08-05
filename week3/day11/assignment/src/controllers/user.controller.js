const express= require('express');

const User= require('../models/user.model');

const upload= require('../middlewares/file_uploads');

const router= express.Router();

router.post("", 
upload.single('profile_pic'),
async(req,res)=>{
    try{
        const user = await User.create({
            id: req.body.id,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            profile_pic: req.file.path
        });

        return res.send(user);
    }catch(err){
        return res.status(500).send({message: err.message})

    }
});

router.patch("/:id", async(req,res)=>{
    console.log( await User.findById(req.params.id))
    try{
        /*const del= await User.findByIdAndDelete(req.params.id, req.body)*/
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{
            new: true
        }).lean().exec();

        return res.send(user);
    }catch(err){
        return res.status(500).send({message: err.message})

    }
});


router.delete("/:id", async(req,res)=>{
    try{
        const user = await User.findByIdAndDelete(req.params.id).lean().exec();

        return res.send(user);
    }catch(err){
        return res.status(500).send({message: err.message})

    }
});



module.exports=router;