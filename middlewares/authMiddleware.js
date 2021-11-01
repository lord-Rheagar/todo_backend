const jwt = require("jsonwebtoken")

const requireAuth = (req,res, next)=>{
    const token =req.body.token || req.query.token || req.headers["x-access-token"];
    console.log(token)

  if (!token) {
    return res.status(403).json({
        err: "A token is required for authentication"
    });
  }
  try {
    const decoded = jwt.verify(token, "valar morgulis");
    req.user = decoded;
  } catch (err) {
      console.log(err)
    return res.status(401).send("Invalid Token");
  }
  return next();
}

module.exports = requireAuth