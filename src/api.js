const express=require("express")
const serverless=require("serverless-http")
const bitbnsApi = require('bitbns');


const app=express()

const router=express.Router();
router.get('/',(req,res)=>{
    res.json({
        message:"Hi!"
    })
})


// for bitbns
router.get('/0/connect/:apiKey/:apiSecret',(req,res)=>{
    const bitbns = new bitbnsApi({
        apiKey :  req.params.apiKey,
        apiSecretKey : req.params.apiSecret});

        bitbns.platformStatus(function(error, data){
            if(data.status==1 && error==null && data.code==200){
                res.json({isConnected:true})
            }else{
                res.json({isConnected:false})
            }
          });
})

app.use('/.netlify/functions/api',router)

module.exports.handler=serverless(app)