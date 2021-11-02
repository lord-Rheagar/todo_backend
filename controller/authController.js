const User = require("../models/user")
const jwt = require("jsonwebtoken");
const SECRET = require("../config/index")

const passport = require("passport")

const handleErrors=(err)=>{
    console.log(err.message, err.code)
    console.log(err)

    let errors ={email:'', password:'', firstname:'', lastname:''}
    

    if(err.message==='Incorrect Email')
    {
        errors.email= "Email not found"
        
    }

    if(err.message==='Incorrect Password')
    {
        errors.password= "Incorrect password entered"
    }



    if(err.message.includes("User validation failed"))
    {
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }

   else if(err.message.includes("E11000 duplicate key error collection"))
   {
       let error = "Email already registered "

       return error
   }

    return errors
}



const signup= async(req,res)=>{
    const {firstname, lastname, email, password} = req.body

    try{
        
        const newUser = await User.create({
            firstname,
            lastname,
            email,
            password
        })

       
        //await newUser.save();

        res.status(201).json({
            message:"You are now successfully registered",
            success:true,  
            user:newUser
        });


    }
    catch(err){
         const error = handleErrors(err)
         console.log(err)
        
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
        const user = await User.login(email,password)
       

        
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
    catch(err){
        console.log(err)
        const errors = handleErrors(err)

        
      res.status(400).json({
          message:"Unable to login",
          success:false, 
         err:{
             email: errors.email,
             password: errors.password
             

         },
      })
       
    }
}

const userAuth = passport.authenticate("jwt", {session:false})

module.exports ={
    signup,
    login,
    userAuth
}