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

        res.status(200).json({
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



router.get('/getProductbyId/:value', async(req, res) => {
    try {
        const { value } = req.params
        console.log(value)

        const products = await product.find({catagory:value})
        console.log(products)

        res.status(200).json(products)

    } catch (error) {
        res.status(500).json(error)
    }
})

router.post('/deleteProduct/:id', async(req,res) => {
    try {
        const { id } = req.params
        console.log(id)

        const response  = await product.findByIdAndDelete({_id:id})
        res.status(200).json({
            message: "Finally deleted"
        })

    } catch (error) {
        console.log(error)
    }
})


router.post("/updateProduct/:id", async(req,res) => {
    try{
        const { id } = req.params
        const { name, capacity, catagory, company, pansize, accuracy, desc, picture, model } = req.body
        console.log(id)
        console.log(name, capacity, catagory, company, pansize, accuracy, desc, picture, model)

        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (capacity !== undefined) updateData.capacity = capacity;
        if (pansize !== undefined) updateData.pansize = pansize;
        if (accuracy !== undefined) updateData.accuracy = accuracy;
        if (desc !== undefined) updateData.desc = desc;
        if (picture !== undefined) updateData.picture = picture;

        await product.findByIdAndUpdate(id, updateData, { new:true,runValidators: true })

        res.status(200).json("Product Details Updated successfully")

    } catch(error){
        res.status(500).json("Couldn't Update at this point")
    }
})
 




module.exports = router