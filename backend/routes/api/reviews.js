const express = require('express');
const { setTokenCookie, requireAuth,restoreUser } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { Review,ReviewImage } = require('../../db/models');
const {sequelize} = require('../../db/models')
const {User} = require('../../db/models')

router.get('/current',requireAuth, async (req, res) => {
    const newSpot = {}
    newSpot.Reviews = await Review.findAll({
        raw:true,
        where:{userId:req.user.id}
    })
    for (const spott of newSpot.Reviews) {
        const spotReviewd = await Spot.findOne({
            where: {id: spott.id,},
            attributes:['id','ownerId','address','city','state','country','lat','lng','name','price'],
            raw:true
        })
        const user = await User.findOne({
            where: {id: spott.id},
            attributes:['id',"firstName","lastName"],
            raw:true
        })
        const allowPreview = await SpotImage.findOne({
            where: {spotId: spott.id,preview:true },
            attributes:['url'],
            raw:true
        })
        const image = await ReviewImage.findAll({
            where: {reviewId: spott.id,},
            attributes:['id','url'],
            raw:true
        })
       spott.User = user
       spott.Spot = spotReviewd
       spotReviewd.previewImage = allowPreview
       if(allowPreview){
        spotReviewd.previewImage = allowPreview
       }
       spott.ReviewImages = image
    }
    return res.json(newSpot)
  })



module.exports = router;