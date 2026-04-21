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
            product:{
                id:product?.id || "na",
                model: product?.model || "na",
                prodname:product?.prodname || "na",
                prodcatagory:product?.prodcatagory || "na"
            }
        })

        res.status(200).send()

    }catch (error) {
        res.status(500).json({
            message:"query Not Create"
        })
    }
})


module.exports = router