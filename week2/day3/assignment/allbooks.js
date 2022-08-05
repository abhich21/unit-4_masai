const express =require('express');

const app=express();

app.get('/books',allBooks('admin'),(req,res)=>{
    res.send(req.role);
});

function allBooks(role){
    return function(req,res,next){
        if(role=='admin'){
            console.log('fetching allbooks...');
            req.role='Fetchhing all books...'
        }else{
            req.role='Error'
        }
        next();
    };
}



app.listen(6666,function(){
    console.log('listening to port 6666');
});