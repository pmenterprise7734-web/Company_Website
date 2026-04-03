const mongoose = require('mongoose')

const TestSchema = new mongoose.Schema({
    name:String,
    price: Number,
    ip: String
})

const TestTask = mongoose.model('TestTask',TestSchema)
module.exports = TestTask