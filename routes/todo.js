var express = require("express")
var router = express.Router()
const User = require("../models/user")


const{
    createTodo,
    getTodoById,
    getTodo,
    deleteTodo,
    getAllTodos,
    updateTodo
}= require("../utils/requests")

router.param("userId",(req,res,next, userId)=>{
    User.findById(userId).exec((err,user)=>{
        if(err||!user){
            console.log(err)
            return res.status(400).json(
                {
                    error:"User Not found"
                }
            )
        }
        console.log(user)


        next();
    })
})

//fetch the value from the url
router.param("todoId", getTodoById)

//to get one todo
router.get("/:_id/todo/:todoId/", getTodo)

// to get all todos
router.get("/:userId/todos/", getAllTodos)

//to create a new todo
router.post("/:_id/todo/create/",createTodo)

//to update a todo
router.put("/:_id/todo/:todoId/update/", updateTodo)

//to delete a todo 
router.delete("/:_id/todo/:todoId/delete/",deleteTodo)

module.exports = router