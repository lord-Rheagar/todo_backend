const jwt = require("jsonwebtoken")

const requireAuth = (req,res, next)=>{
    const token = req.cookies.jwt

    if(token)
    {
        jwt.verify(token, "valar morgulis", (err, decodedToken)=>{
            if(err)
            {
                console.log(err.message);
                res.status(400).json({
                    error:"Something went wrong"
                })
            }
            else{
                next();
            }
        })
    }
    else{
        res.status(400).json({
            error: "Log in to access todos"
        })
    }
}

module.exports = {requireAuth}