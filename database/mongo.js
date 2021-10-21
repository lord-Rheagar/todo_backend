const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://todo_app:bodhi1234@cluster0.sxea1.mongodb.net/todo_app?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});
 