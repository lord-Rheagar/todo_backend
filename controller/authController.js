const User = require("../models/user")


const handleErrors=(err)=>{
    console.log(err.message, err.code)
    console.log(err)

    let errors ={email:'', password:'', firstname:'', lastname:''}

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

exports.signup= async(req,res)=>{
    const {firstname, lastname, email, password} = req.body

    try{
             const newUser = await User.create({firstname, lastname, email,password})
             res.status(201).json(newUser).send("Succesfully signed up")
    }
    catch(err){
        const error = handleErrors(err)

        
        res.status(400).json({error})

    }
    res.send("New user signed in")
}

exports.login = (req,res)=>{
    res.send("User logged in")
}

