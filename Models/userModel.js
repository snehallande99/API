const mongoose = require('mongoose');
require('dotenv').config()
// const bcrypt = require('bcrypt');
const Jwt = require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    channel:{
        type:String,
        require:true
    },
    token:[{
        token:{
            type:String
        }
    }]
})

// userSchema.pre('save',async function(next){
//     if(this.isModified('password')){
//          this.password=await bcrypt.hash(this.password,12)
//     }
//     next()
// })

userSchema.methods.generateToken=async function(){
    try {
      const gToken=Jwt.sign({_id:this._id},process.env.SECRET_KEY);
      this.token=this.token.concat({token:gToken});
      await this.save()
      return gToken
    } catch (error) {
      console.log(error)
    }
}

module.exports=mongoose.model('User',userSchema)

// {
//     "name": "snehal",
//     "email": "Snehal1@",
//     "password": "s1"
//   }
