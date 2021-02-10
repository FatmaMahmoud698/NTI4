const express=require('express')
const doctorModel=require('../models/doctor')

const route= new express.Router()


route.post('/addDoc',(req,res)=>{
    const data= new doctorModel(req.body)
    data.save()
    .then(()=>res.send('added'))
    .catch((e)=>res.send(e.message))
})
route.post('/addDocA',async(req,res)=>{
    const data = new doctorModel(req.body)
    try{
        await data.save()
        res.send('added')
    }
    catch(e){
        res.send(e.message)
    }
    })

module.exports=route