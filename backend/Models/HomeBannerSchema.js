const mongoose = require('mongoose')

const HomePageBanner = new mongoose.Schema({
    banners:[String]
})

const homebanners = mongoose.model("homebanners", HomePageBanner )
module.exports = homebanners
