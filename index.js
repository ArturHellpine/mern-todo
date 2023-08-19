const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 5000
const DB_URL = 'mongodb+srv://admin:Password@cluster0.qlnpabp.mongodb.net/todo?retryWrites=true&w=majority'
app.use(express.json())
app.use(cors())

app.use('/auth', require('./routes/auth.routes'))
app.use('/todo', require('./routes/todo.routes'))

const start = async () => {
    try {
       await mongoose.connect(DB_URL)
        app.listen(PORT, () => {
            console.log(`--- SERVER STARTED ON PORT ${PORT} ---`)
        })
    } catch(err) {
        console.log(err)
    }
}
start()