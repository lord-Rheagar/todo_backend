const mongoose = require('mongoose')

const User = new mongoose.Schema(
    {
         firstname:{
             type:String,
             required: true,
         },

         lastname:{
             type:String,
             required:true,

         },

         email:{
             type:String,
             required:true,
             unique:true,
             
         },

         password:{
             type:String,
             required:true,
             minlength:8
         }
    }
)

module.exports = mongoose.model("User", User)