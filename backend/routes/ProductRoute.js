const express = require('express')
const product = require('../Models/ProductSchema')
const router = express.Router()
 

router.post("/addProduct", async(req, res) => {
    const {name, capacity, catagory, company, pansize, accuracy, desc, picture, model} = req.body
    console.log(name, capacity, catagory, company, pansize, accuracy, desc, picture, model)
    const quantity = 1

    try {
        const result = await product.create({ 
            company: company, 
            catagory: catagory, 
            name: name,
            model: model, 
            capacity: capacity, 
            pansize: pansize, 
            accuracy: accuracy, 
            desc: desc, 
            quantity: quantity, 
            picture: picture
        })

        res.status(201).json({
            success:true,
            message:"Helooooooo",
            data: result
        })


    } catch (error) {
        res.status(500).json({
            success:false,
            message:"failed",
            data: error.message
        })
    }
})

 




module.exports = router