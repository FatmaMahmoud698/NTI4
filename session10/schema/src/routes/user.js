const express=require('express')
const userModel=require('../models/user')

const router= new express.Router()

router.post('/addUser', async(req,res)=>{
    const user = new userModel(req.body)
    try{
        await user.save()
        const token = await user.generateToken()
        if(!token){
            throw new Error('not valid token')
        }
        res.send({
            status:1,
            data:{user,token},
            message:'user added successfuly'
        })
    }
    catch(e){
        res.send({
            status:0,
            data: e.message,
            message: 'error inserting data'
        })
    }
})
module.exports=router