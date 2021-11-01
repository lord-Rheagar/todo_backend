exports.handleErrors=(err)=>{
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