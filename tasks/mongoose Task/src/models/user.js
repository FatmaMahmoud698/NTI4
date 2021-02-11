const mongoose = require('mongoose')
const validator = require('validator')

const User = new mongoose.model('User',{
    name:{
        type: String, 
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
       type:String,
       trim:true,
       required:true,
       unique:true,
       validate(value){
           if(!validator.isEmail(value)){
               throw new Error('email is invalid')
           }
       }
    },
    phone:{
        type:String,
        trim:true,
        validate(value){
            if(!validator.isMobilePhone(value,'ar-EG')){
                throw new Error('phone is invalid')
            }
        }
     }
})

module.exports=User