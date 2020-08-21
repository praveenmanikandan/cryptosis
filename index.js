const express=require("express");

const app=express();

app.get('/',(req,res)=>{
    res.send("Working bruh... testing");
})

const port=process.env.port||3000;

app.listen(port,()=>{
    console.log("Server is up!");
});