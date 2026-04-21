const mongoose = require('mongoose')


const QuerySchema = new mongoose.Schema({
    name:String,
    company:String,
    address:String,
    state:String,
    country:String,
    email:String,
    phone:String,
    website:String,
    comment:String, 
    prodquery:Boolean,
    product:{
        id:String,
        model:String,
        prodname:String,
        prodcatagory:String,
        quantity:Number,
        picture:String
    }
})

const query_schema = mongoose.model("query_schema", QuerySchema)
module.exports = query_schema