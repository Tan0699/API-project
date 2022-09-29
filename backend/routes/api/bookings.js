const express = require('express');
const { setTokenCookie, requireAuth,restoreUser } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot } = require('../../db/models');
const { SpotImage,ReviewImage } = require('../../db/models');
const { Review } = require('../../db/models');
const {sequelize} = require('../../db/models')
const {User} = require('../../db/models');
const spotimage = require('../../db/models/spotimage');
const spot = require('../../db/models/spot');
const {Booking} = require('../../db/models');
// Get all of the Current User's Bookings
router.get('/current',requireAuth, async (req, res) => {
    const myBookings = {}
    myBookings.Bookings = await Booking.findAll({
        raw:true,
        where:{userId:req.user.id}
    })
    for (const spott of myBookings.Bookings) {
        const spotReviewd = await Spot.findOne({
            where: {id: spott.id,},
            attributes:['id','ownerId','address','city','state','country','lat','lng','name','price'],
            raw:true
        })
        const allowPreview = await SpotImage.findOne({
            where: {spotId: spott.id,preview:true },
            attributes:['url'],
            raw:true
        })
       spott.Spot = spotReviewd
       if(allowPreview){
        spotReviewd.previewImage = allowPreview.url
       }
       //...
       //THERE IS PROBALY A MISSING ATTRIBUTE OUTPUT IN ONE OF THE ROUTES WITH SPOTIMG/REVIMG
       // REMEMBER TO TRIPLE TEST ROUTES
    }
    return res.json(myBookings)
})




module.exports = router;

  
