const { Schema, Types } = require('mongoose')
const mongoose = require("mongoose");

const UserModel = new Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todos: [{ type: Types.ObjectId, ref: 'Todo' }]
})

module.exports = mongoose.model('User', UserModel)