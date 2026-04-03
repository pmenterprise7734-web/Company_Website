const mongoose = require('mongoose')

const DBConnect = async() => {
    try{
        const connect = await mongoose.connect(process.env.MONGODB_URI)

        console.log("MongoDb Connected")
    } catch(error){
        console.error("DB connection error: ", error)
    }
}

module.exports = DBConnect