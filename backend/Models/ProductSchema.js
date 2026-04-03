const mongoose = require("mongoose")

const Product = new mongoose.Schema({
    company:String,
    catagory:String,
    name:String,
    model:String,
    capacity:String,
    pansize:String,
    accuracy:String,
    desc:String,
    quantity: Number, // no need now, will be in need for future use. so using constant value 1
    picture:String,
    
})

const product = mongoose.model('product', Product)
module.exports = product
    