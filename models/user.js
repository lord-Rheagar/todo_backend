const mongoose = require('mongoose')
const {isEmail} = require('validator')
const User = new mongoose.Schema(
    {
         firstname:{
             type:String,
             required: [true, "Please enter your first name"],
         },

         lastname:{
             type:String,
             required: [true, "Please enter your last name"],

         },

         email:{
             type:String,
             required: [true, "Please enter your email id"],
             unique:true,
             validate:[isEmail, 'Please enter a valid email']             
         },

         password:{
             type:String,
             required: [true, "Please enter your password"],
             minlength:[8, "Minimum password is of 8 characters"]
         },

    }
)





module.exports = mongoose.model("User", User)