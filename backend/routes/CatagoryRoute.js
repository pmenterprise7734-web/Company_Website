const express = require('express')
const Catagory = require("../Models/CatagoriesSchema")
const router = express.Router()


router.post("/addCatagory", async(req, res) => {
    const {catagoryname,value,picture,status} = req.body
    console.log(catagoryname,value,picture,status)

    try {
        const request = await Catagory.create({
            catagoryname:catagoryname,
            value:value,
            picture:picture,
            status:status
        })

        res.status(201).json({
            success:true,
            message:"Catagory added successfully",
            data: request
        })


    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Catagory adding request failed",
            data: error.message
        })
    }
})


router.get("/getCatagory", async(req, res) => {
    try {
        const result = await Catagory.find() 
        res.json(result)
    } catch (error) {
        res.json(false)
    }
})


router.post("/changeVisibility", async(req, res) => {
    try {
        const { id, status } = req.body
        console.log(id, status)

        const updated = await Catagory.findByIdAndUpdate(id, {status:status}, {returnDocument: "after"})

        res.status(201).json({
            message:'status got changed'
        })                        
    } catch (error) {
        res.status(500).json({
            message:'not successful'
        })
    }
})



module.exports = router 