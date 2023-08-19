const TodoModel = require('../models/Todo')

const addTodo = async (req, res) => {
    try {
        const { text, userId } = req.body
        const todo = await new TodoModel({
            text,
            owner: userId,
            completed: false,
            important: false
        })
        await todo.save()
        res.json(todo)
    } catch (err) {
        console.log(err)
    }
}

const getTodos = async (req, res) => {
    try {
        const { userId } = req.query
        const todos = await TodoModel.find({ owner: userId })
        res.json(todos)
    } catch (err) {
        console.log(err)
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todo = await TodoModel.findByIdAndDelete({ _id: req.params.id })
        res.json(todo)
    } catch (err) {
        console.log(err)
    }
}

const completedTodo = async (req, res) => {
    try {
        const todo = await TodoModel.findOne({ _id: req.params.id })
        todo.completed = !todo.completed
        await todo.save()
        res.json(todo)
    } catch (err) {
        console.log(err)
    }
}

const importantTodo = async (req, res) => {
    try {
        const todo = await TodoModel.findOne({ _id: req.params.id })
        todo.important = !todo.important
        await todo.save()
        res.json(todo)
    } catch (err) {
        console.log(err)
    }
}

module.exports = { addTodo, getTodos, deleteTodo, completedTodo, importantTodo }