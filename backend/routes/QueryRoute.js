const express = require('express')
const query_schema = require('../Models/QuerySchema');
const router = express.Router()


router.post("/AddQuery", async(req,res) => {
    const {name, company, address, state, country, email, phone, website, comment, prodquery, product} = req.body;
    console.log(name, company, address, state, country, email, phone, website, comment, prodquery, product)

    try {
        const result = await query_schema.create({
            name:name,
            company:company,
            address:address,
            state:state,
            country:country,
            email:email,
            phone:phone,
            website:website,
            comment:comment, 
            prodquery:prodquery,
            read:false,
            product:{
                id:product?.id || "na",
                model: product?.model || "na",
                prodname:product?.name || "na",
                prodcatagory:product?.catagory || "na",
                quantity:product?.quantity || null,
                picture:product?.picture || "na"
            }
        })

        res.status(200).send()

    }catch (error) {
        res.status(500).json({
            message:"query Not Create"
        })
    }
})


router.get("/getAllQuery", async(req, res) => {
    try {
        const response = await query_schema.find()

        res.status(200).json({
            data: response,
            message:"All queries fetched successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Internal error! no query fetched"
        })
    }
})

router.put("/readStatusChange/:id", async(req,res) => {
    try {
        const UpdateData = await query_schema.findByIdAndUpdate( req.params.id, {
            read:true
        },{
            new:true
        })

        res.json({
            success:true,
        })

    } catch (error) {
        res.status(500).json({
            message:error.message
        })
    }
})


module.exports = router