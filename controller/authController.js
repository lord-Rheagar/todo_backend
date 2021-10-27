const User = require("../models/user")
const jwt = require("jsonwebtoken");
const SECRET = require("../config/index")


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
       let error = "Entered email has already been registered"

       return error
   }

    return errors
}

const maxTime = 2*24*60*60

const createToken =(id)=>{
     return jwt.sign({id}, 'valar morgulis',{
           expiresIn: maxTime
     })
}

exports.signup= async(req,res)=>{
    const {firstname, lastname, email, password} = req.body

    try{
             const newUser = await User.create({firstname, lastname, email,password})
             const token = createToken(newUser._id);

             res.cookie('jwt', token,{httpOnly:true, maxAge:maxTime*1000})
             res.status(201).json({
                 message:"You are successfully signed up",
                 user: newUser
             })
    }
    catch(err){
        const error = handleErrors(err)

        
        res.status(400).json({error})

    }
    res.send("New user signed in")
}

exports.login = async(req,res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.login(email,password)
        const token = createToken(user._id);

        res.cookie('jwt', token,{httpOnly:true, maxAge:maxTime*1000})
        res.status(201).json({
            message:"You are successfully logged in",
            user: user
        })
        
    }
    catch(err){
        console.log(err)
        const errors = handleErrors(err)

      res.status(400).json({
          email: errors.email,
          password:errors.password
      })
       
    }
}

