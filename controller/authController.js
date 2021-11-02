const User = require("../models/user")
const jwt = require("jsonwebtoken");
const SECRET = require("../config/index")
const bcrypt = require("bcrypt")
const handleErrors = require("../utils/errorHandling")
const passport = require("../middlewares/passport")




const signup= async(req,res)=>{
    const {firstname, lastname, email, password} = req.body

    try{
        const salt = await bcrypt.genSalt();
        encryptedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            firstname,
            lastname,
            email:email.toLowerCase(),
            password:encryptedPassword 


        })

        await newUser.save();

        res.status(201).json({
            message:"You are now successfully registered",
            success:true,  
            user:newUser
        });


    }
    catch(err){
        const error = handleErrors(err)

        
        res.status(400).json({
            message:"Unable to create your account",
            success:false,
            err:error
        })

    }
    
}

const login = async(req,res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({ email });
       

        if (user && (await bcrypt.compare(password, user.password))) {
          
          const token = jwt.sign(
            { user_id: user._id, 
            email:user.email 
            },

            "valar morgulis",
            {
              expiresIn: "2 days",
            }
          );
    
        
        let result ={
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            token: `Bearer ${token}`
        }
    
          
          res.status(200).json({
              ...result,
              message:"You are successfully logged in",
              success:true
            }
            );
        }
       
        
    }
    catch(err){
        console.log(err)
        const errors = handleErrors(err)

        
      res.status(400).json({
          message:"Unable to login",
          success:false, 
         err:errors,
      })
       
    }
}

const userAuth = passport.authenticate("jwt", {session:false})

module.exports ={
    signup,
    login,
    userAuth
}