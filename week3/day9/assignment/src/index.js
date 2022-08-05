const express= require('express');

const connect= require('./configs/db');

const userController= require('./controller/user.contoller');


const app= express();

app.use(express.json())

app.use("/users", userController);





app.listen(3232, async()=>{
    try{
        await connect();
    console.log('listening to server 3232');

    }catch(err){
        console.log(err.message);
    }
});