const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt =require('jsonwebtoken')
const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        minLength:[5,'minmum length'],
        maxLength:25,
        trim:true
    },
    lname:{
        type:String,
        minLength:[5,'minmum length'],
        maxLength:25,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },
    age:{
        type:Number
    },
    tokens:[
        {
            token:{type:String}
        }
    ]
},{
    timestamps:true
})
userSchema.methods.toJSON = function(){
    const user = this.toObject()
    delete user.password
    delete user.__v
    return user
}

userSchema.methods.generateToken = async function(){
    const user = this
    try{
    const token = jwt.sign({_id:user._id.toString()},'123456')
    user.tokens= user.tokens.concat({token})
    await user.save()
    }catch(e){
        token=false
    }
    return token
}
userSchema.pre('save', async function(next){
    const user = this
    if(user.isModified('password'))
        user.password = await bcrypt.hash(user.password, 12)
    next()
})
const User = mongoose.model('User', userSchema)
module.exports =User