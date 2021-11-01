const User = require("../models/user")
const jwt = require("jsonwebtoken");
const SECRET = require("../config/index")
const bcrypt = require("bcrypt")
const handleErrors = require("../utils/errorHandling")



const maxTime = 2*24*60*60

const createToken =(id)=>{
     return jwt.sign({id}, 'valar morgulis',{
           expiresIn: maxTime
     })
}

exports.signup= async(req,res)=>{
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

        const token = jwt.sign(
            {user_id: newUser._id, email},
            "valar morgulis",
            {
                expiresIn:"5h",
            }
        )

        newUser.token = token;

        res.status(201).json(newUser);


    }
    catch(err){
        const error = handleErrors(err)

        
        res.status(400).json({error})

    }
    
}

exports.login = async(req,res)=>{
    const {email, password} = req.body;

    try{
        const user = await User.findOne({ email });
       

        if (user && (await bcrypt.compare(password, user.password))) {
          
          const token = jwt.sign(
            { user_id: user._id, email },
            "valar morgulis",
            {
              expiresIn: "5h",
            }
          );
    
          
          user.token = token;
    
          
          res.status(200).json(user);
        }
       
        
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

