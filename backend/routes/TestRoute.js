const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const TestTask = require('../Models/TestSchema')


router.post("/TestAdd", async(req, res) => {
    const {name, price, ip} = req.body
    console.log(name, price, ip)

    const result = TestTask.create({ip,name,price})
})
 


module.exports = router