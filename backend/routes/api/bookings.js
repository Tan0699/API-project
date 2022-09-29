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
const { DATEONLY, DATE } = require('sequelize');
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
const validateBooking = [
    check('startDate')
      .notEmpty()
      .withMessage('StartDate is required'),
    check('endDate')
      .notEmpty()
      .withMessage('EndDate is required'),
    handleValidationErrors
  ];
//Edit a booking
router.put('/:bookingId',requireAuth,validateBooking, async (req, res) => {
    const {bookingId} = req.params
    const {startDate,endDate} = req.body
    if (endDate <= startDate) {
        return res.json({
            "message": "Validation error",
            "statusCode": 400,
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
          })
        }
        const findBooking = await Booking.findOne({where:{
          id:bookingId
        }})
        if(!findBooking){
          res.status(404)
          return res.json({
            "message": "Booking couldn't be found",
            "statusCode": 404
          })
        }
        const booked = await Booking.findAll({
          raw:true,
          where:{userId:req.user.id}
        })
        for (let bookings of booked){
            console.log(new Date ())
            console.log(bookings.endDate)
            console.log(bookings.endDate>new Date())
            console.log(bookings.endDate<new Date())
            if(bookings.endDate>new Date()){
            
                return res.json({
                    "message": "Past bookings can't be modified",
                    "statusCode": 403
                  })
            }
          if((startDate>=bookings.startDate &&startDate<=bookings.endDate)||
          (endDate>=bookings.startDate &&endDate<=bookings.endDate)){
            return res.json({
              "message": "Sorry, this spot is already booked for the specified dates",
              "statusCode": 403,
              "errors": {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
              }
            })
          }
        }
        
    //     const newBooking = await Booking.create({
    //       userId:req.user.id,
    //       startDate,
    //       endDate,
    //   })
      return res.json(booked)
    })


//Delete a Booking
router.delete('/:reviewId',requireAuth, async (req, res) => {

})

module.exports = router;

  
