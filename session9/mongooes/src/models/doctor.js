const mongoose=require('mongoose')
const validator = require('validator')

const doctor = mongoose.model('Doctor',{
    userName:{
        type:String,
        maxlength:15,
        default:'new doctor'
    },
    password:{
        type:String,
        required:true,
        trim:true,
        // lowercase:true,
        // uppercaser:true
    },
    email:{
       type:String,
       trim:true,
       required:true,
       validate(value){
           if(!validator.isEmail(value)){
               throw new Error('email is invalid')
           }
       }
    },
    age:{
        type:Number,
        validate(value){
            if(value<22) throw new Error('invalid age')
        }
    },
    patients:[
        {
            name:{type:String,default:'new patient'},
            age:{type:Number,required:true},
            history:{type:String}
        }
    ]
})
module.exports=doctor 