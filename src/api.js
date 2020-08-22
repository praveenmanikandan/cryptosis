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
            res.json({
                "status":data.status,
                "error":data.error,
                "code":data.code
            })
          });
})

app.use('/.netlify/functions/api',router)

module.exports.handler=serverless(app)