var mongoose = require('mongoose')

var mongodb = "mongodb://127.0.0.1/my_todo"
mongoose 
 .connect(mongodb, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        })   

  var db = mongoose.connection
 db.on('error', console.error.bind(console, 'MongoDB Conection error'))