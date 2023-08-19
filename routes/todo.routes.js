const { Router } = require('express')
const { addTodo, getTodos, deleteTodo, completedTodo, importantTodo } = require("../controllers/TodoController");
const router = Router()

router.post('/add', addTodo)
router.get('/get', getTodos)
router.delete('/delete/:id', deleteTodo)
router.put('/completed/:id', completedTodo)
router.put('/important/:id', importantTodo)

module.exports = router
