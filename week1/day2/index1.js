const express=require('express')
//console.log('express:', express)

const books=require('./books.json')

const app=express();

app.get("",(req,res)=>{
    return res.send('Hello')
});
app.get("/books",(req,res)=>{
    return res.send({books:books})
})

app.listen(6563,function(){
    console.log('listening the port 6563')
})