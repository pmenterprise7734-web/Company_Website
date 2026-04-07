const express = require('express')
const homebanners = require('../Models/HomeBannerSchema')
const router = express.Router()

router.post('/addBanner', async(req, res) => {
    const {imgUrl} = req.body 

    try {
        const push = await homebanners.updateOne(
          {},
          {$push:{ banners: imgUrl}},
          {upsert:true}
        )

        res.status(200).json({
           message:'Banner added'
        })

    } catch (error) {
        res.status(500).json({
            message:'Banner Not added'
        })
    }
})


router.get("/getBanners", async(req, res) => {
    try {
        const result = await homebanners.find()
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.post('/deleteBanner', async(req, res) => {
    const {url} = req.body 
    console.log(url)

    try {
        const pull = await homebanners.updateOne(
            {},
            {$pull : {banners : url}}
        )
        res.status(200).json({message:"delete complete"})

    } catch (error) {
        console.log(error)
        res.status(500).json({message:"delete incomplete"})
    }

})

module.exports = router