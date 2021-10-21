var express = require("express")
var router = express.Router()


const{
    createTodo,
    getTodoById,
    getTodo,
    deleteTodo,
    getAllTodos,
    updateTodo
}= require("../utils/requests")

//fetch the value from the url
router.param("todoId", getTodoById)

//to get one todo
router.get("/todo/:todoId/", getTodo)

// to get all todos
router.get("/todos/", getAllTodos)

//to create a new todo
router.post("/todo/create/",createTodo)

//to update a todo
router.put("/todo/:todoId/update/", updateTodo)

//to delete a todo 
router.delete("/todo/:todoId/delete/",deleteTodo)

module.exports = router