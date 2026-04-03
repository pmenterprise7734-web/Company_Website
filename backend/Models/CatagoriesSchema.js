const mongoose = require("mongoose")


const catagories = new mongoose.Schema({
    catagoryname:String,
    value:String,
    picture:String,
    status:Boolean
})

const catagory = mongoose.model("catagories", catagories)
module.exports = catagory