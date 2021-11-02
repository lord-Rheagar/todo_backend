const mongoose = require('mongoose')
const {isEmail} = require('validator')
const bcrypt= require("bcrypt")
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

User.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });



User.statics.login = async function(email, password) {
    const user = await this.findOne({ email });
    if (user) {
      const auth = await bcrypt.compare(password, user.password);
      if (auth) {
        return user;
      }
      throw Error('incorrect password');
    }
    throw Error('incorrect email');
  };  



module.exports = mongoose.model("User", User)