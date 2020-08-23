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

//connection
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


//for current balance
router.get('/0/currentbalance/:apiKey/:apiSecret',(req,res)=>{
    const bitbns = new bitbnsApi({
        apiKey :  req.params.apiKey,
        apiSecretKey : req.params.apiSecret});

        bitbns.currentCoinBalance('EVERYTHING', function(error, data){
            const balance={}
            if(!error){
              for(x in data.data){
                  if(data.data[x]>0){
                      balance[x]=data.data[x];
                  }
              }

              res.json({balance,INRBalance:data.data["availableorderMoney"],INRInorderBalance:data.data["inorderMoney"]})
            } else {
              res.json({error})
            }
           })
})

app.use('/.netlify/functions/api',router)

module.exports.handler=serverless(app)