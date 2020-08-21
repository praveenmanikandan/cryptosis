const express=require("express");

const app=express();

app.get('/',(req,res)=>{
    res.send("Working bruh...");
})

app.listen(3000,()=>{
    console.log("Server is up!");
});