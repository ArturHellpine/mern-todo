const { Schema, Types } = require("mongoose");
const mongoose = require("mongoose");

const TodoModel = new Schema({
    owner: { type: Types.ObjectId, ref: 'User' },
    text: { type: String },
    completed: { type: Boolean, default: false },
    important: { type: Boolean, default: false }
})

module.exports = mongoose.model('Todo', TodoModel)
