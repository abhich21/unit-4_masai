const express= require('express');

const connect= require('./configs/db');

const userController= require('./controllers/user.controller');

const {register, login}=require('./controllers/auth.controller')

const postController=require('./controllers/post.controller')

const app= express();

app.use(express.json())

app.use("/users", userController);

app.post("/register", register);

app.post("/login", login);

app.use("/posts", postController);




app.listen(2345, async()=>{
    try{
        await connect();
    console.log('listening to server 2345');

    }catch(err){
        console.log(err.message);
    }
});