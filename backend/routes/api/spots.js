const express = require('express');
const { setTokenCookie, requireAuth,restoreUser } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot } = require('../../db/models');
const { SpotImage,ReviewImage,Booking } = require('../../db/models');
const { Review } = require('../../db/models');
const {sequelize} = require('../../db/models')
const {User} = require('../../db/models');
const spotimage = require('../../db/models/spotimage');
const spot = require('../../db/models/spot');

//....
// Get all Spots
router.get('/', async (req, res) => {
    //  const starAvg = await Review.findAll({
    //     order:[['userId']],
    //     include: [{model: Review,attributes: ['avgRating']}]})
//done
let {size,page} = req.query
  let pagination = {}
  if (!page || isNaN(page)) {page = 1}
  if (!size || isNaN(size)) {size = 20}
  if(page <=0 ){
    return res.json({
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "page": "Page must be greater than or equal to 1"}})
  }
  if(size <=0 ){
    return res.json({
      "message": "Validation Error",
      "statusCode": 400,
      "errors": {
        "size": "Size must be greater than or equal to 1"}})
  }
  page = parseInt(page);
  size = parseInt(size);
  if (page >= 1 && size >= 1) {
    pagination.limit = size
    pagination.offset = size * (page - 1)
  }
    let newSpot = {}
    newSpot.Spots = await Spot.findAll({ raw: true,...pagination })
   
    for (const spott of newSpot.Spots) {
        const avg = await Review.findAll({
            where: { spotId: spott.id},
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'average']],
            raw:true
        })
        const allowPreview = await SpotImage.findOne({
            where: {spotId: spott.id,preview:true },
            attributes:['url'],
            raw:true
        })

       spott.avgRating = (Number(avg[0].average).toFixed(1))
       if(allowPreview){
        spott.previewImage = allowPreview.url
       }
    }


    newSpot.page = page 
    newSpot.size = size
    return res.json(newSpot)
}
  );


//...
  //Get all Spots owned by the Current User
  router.get('/current',requireAuth, async (req, res) => {
    const newSpot = {}
    newSpot.Spot = await Spot.findAll({
        raw:true,
        where:{ownerId:req.user.id}
    })
   
    for (const spott of newSpot.Spot) {
        const avg = await Review.findAll({
            where: { spotId: spott.id},
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'average']],
            raw:true
        })
        const allowPreview = await SpotImage.findOne({
            where: {spotId: spott.id,preview:true },
            attributes:['url'],
            raw:true
        })
        console.log(avg[0].average)
        console.log(typeof(avg[0].average))
       spott.avgRating = (Number(avg[0].average).toFixed(1))
       if(allowPreview){
        spott.previewImage = allowPreview.url
       }
    }
    return res.json(newSpot)
  })


  //Get details of a Spot from an id
  router.get('/:spotId', async (req, res) => {
    const {spotId} =req.params
    const newSpot = {}
    const spotFound = await Spot.findByPk(spotId,{raw:true})
    if(!spotFound){
      res.status(404)
      return res.json({"message": "Spot couldn't be found"})
    }
    newSpot.Spot = spotFound
   
        const owner = await User.findOne({
            where:{id:newSpot.Spot.id},
            attributes:['id','firstName','lastName']
            
        })
      
        console.log(owner,"lmao")
        const avg = await Review.findAll({
            where: { spotId: newSpot.Spot.id},
            attributes: [[sequelize.fn('AVG', sequelize.col('stars')), 'average'],
                         [sequelize.fn('COUNT',sequelize.col('stars')),'count']],
            raw:true
        })
        const allowPreview = await SpotImage.findOne({
            where: {spotId: newSpot.Spot.id,preview:true },
            attributes:['id','url','preview'],
            raw:true
        })
        console.log(avg[0].average)
        console.log(typeof(avg[0].average))
        newSpot.Spot.numReviews = (Number(avg[0].count))
        newSpot.Spot.avgRating = (Number(avg[0].average).toFixed(1))
       if(allowPreview){
        newSpot.Spot.SpotImages = allowPreview
       }
       newSpot.Spot.Owner= owner
    
    return res.json(newSpot.Spot)
  })

  const validateSpot = [
    check('address')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Street address is required'),
    check('city')
      .notEmpty()
      .withMessage('City is required'),
    check('state')
      .notEmpty()
      .withMessage('State is required'),
    check('country')
      .notEmpty()
      .withMessage('Country is required'),
    check('lat')
      .notEmpty()
      .withMessage('Latitude is not valid'),
    check('lng')
      .notEmpty()
      .withMessage('Longitude is not valid'),
    check('name')
      .isLength({ max: 50 })
      .withMessage('Name must be less than 50 characters'),
    check('name')
      .notEmpty()
      .withMessage('Name is not valid'),
    check('description')
      .notEmpty()
      .withMessage('Description is require'),
    check('price')
      .notEmpty()
      .withMessage('Price per day is required'),
    handleValidationErrors
  ];



  //Create a Spot
  router.post('/',requireAuth,validateSpot, async (req, res) => {
    const {address,city,state,country,lat,lng,name,description,price} = req.body
    const createSpot = await Spot.create({
        ownerId:req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    return res.json(createSpot) //status is 200 but doc says need 201?
  })                            // revisit later 


  //Delete a Spot
  router.delete('/:spotId',requireAuth, async (req, res) => {
    const {spotId} = req.params
    const destroySpot = await Spot.findByPk(spotId,{where:{ownerId:req.user.id}})
    if(!destroySpot){
        return res.status(404).json({"message": "Spot couldn't be found"})
    }
    await destroySpot.destroy()
    return res.json({"message": "Successfully deleted"})
  })


 // Get all Reviews by a Spot's id
  router.get('/:spotId/reviews', async (req, res) => {
    const {spotId} = req.params
    const newSpot = {}
    const allReviews = await Review.findAll({
        raw:true,
        where:{spotId:spotId}
    })
    console.log(allReviews)
    if(!allReviews.length){
        res.status(404)
        return res.json({"message": "Spot couldn't be found"})
    }
    newSpot.Reviews = allReviews
    for (const spott of newSpot.Reviews) {
        const user = await User.findOne({
            where: {id: spott.spotId},
            attributes:['id',"firstName","lastName"],
            raw:true
        })
        const image = await ReviewImage.findAll({
            where: {reviewId: spott.id,},
            attributes:['id','url'],
            raw:true
        })
       spott.User = user
       spott.ReviewImages = image
    }
    return res.json(newSpot)
  })

//Add an Image to a Spot based on the Spot's id
router.post('/:spotId/images',requireAuth, async (req, res) => {
    const {spotId} = req.params
    const{url,preview} = req.body
    const findSpot = await Spot.findByPk(spotId,{
        where:{ownerId:req.user.id}
    })
    if(!findSpot){
        res.status(404)
        return res.json({
          "message": "Spot couldn't be found",
          "statusCode": 404
        })
    }
    const newImage = await SpotImage.create({
        spotId:findSpot.id,
        url,
        preview,
    })
    // const showImage = await SpotImage.findOne({
    //     where:{spotId:newImage.id},
    //     atrributes:['url','preview']
     
    // })
    const object = {}
    object.id = newImage.id
    object.url = newImage.url
    object.preview = newImage.preview
    return res.json(object)
})

//Edit a Spot
router.put('/:spotId',requireAuth,validateSpot, async (req, res) => {
const {spotId} = req.params
const {address,city,state,country,lat,lng,name,description,price} = req.body
const spotFound = await Spot.findByPk(spotId,{where:{ownerId:req.user.id}})
if (!spotFound){
    res.status(404)
    return res.json({"message": "Spot couldn't be found"})
}
spotFound.address =address
spotFound.city = city
spotFound.state = state
spotFound.country = country
spotFound.lat = lat
spotFound.lng = lng
spotFound.name = name
spotFound.description = description
spotFound.price = price
await spotFound.save()
return res.json(spotFound)
})

const validateReview = [
    check('review')
      .notEmpty()
      .withMessage('Review text is required'),
      check('stars')
      .notEmpty()
      .isInt({max:5},{min:1})
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
  ];

//Create a Review for a Spot based on the Spot's id
router.post('/:spotId/reviews',requireAuth,validateReview, async (req, res) => {
    const {spotId} = req.params
    const {review,stars} = req.body
    const findSpot = await Spot.findByPk(spotId)
    if(!findSpot){
        res.status(404)
        return res.json({
          "message": "Spot couldn't be found",
          "statusCode": 404
        })
    }
    const sameReview = await Review.findAll({where:{userId:req.user.id,
        spotId:findSpot.id}})
    console.log(sameReview)
    if(sameReview.length){
        res.status(403)
        return res.json({
          "message": "User already has a review for this spot",
          "statusCode": 403
        })
    }
    const newReview = await Review.create({
        userId:req.user.id,
        spotId:findSpot.id,
        review,
        stars
    })
    return res.json(newReview)
})

//Get all Bookings for a Spot based on the Spot's id
router.get('/:spotId/bookings',requireAuth, async (req, res) => {
  const {spotId} = req.params
  const theBookings = {}
  const myBookings = await Booking.findAll({
    raw:true,
    where:{spotId}
})
console.log(myBookings,"pepe")
  const searchSpot = await Spot.findByPk(spotId)
    if(!searchSpot){
      res.status(404)
      return res.json( {
        "message": "Spot couldn't be found",
        "statusCode": 404
      })
    }
    const mySpot = await Spot.findOne({where:{id:spotId,ownerId:req.user.id}})
    if(mySpot){
      const findme = await User.findOne({ raw:true,
        attributes:['id','firstName','lastName'],
        where:{id:req.user.id}
        })
        console.log("lmao")
      theBookings.Bookings = myBookings
      for (let smol of myBookings){
        smol.User = findme
        console.log(smol)
      }
      return res.json(theBookings)
    }
    if(searchSpot.ownerId !== req.user.id){
      const notmyBookings = await Booking.findAll({
        raw:true,
        attributes:['spotId','startDate','endDate'],
        where:{spotId}
    })
      return res.json(notmyBookings)
    }

    for (const spott of theBookings.Bookings) {
        const allowPreview = await SpotImage.findOne({
            where: {spotId: spott.id,preview:true },
            attributes:['url'],
            raw:true
        })
       spott.Spot = spotReviewd
       if(allowPreview){
        spotReviewd.previewImage = allowPreview.url
       }
    }
    return res.json(theBookings)
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
router.post('/:spotId/bookings',requireAuth,validateBooking, async (req, res) => {
  const {startDate, endDate} = req.body
  if (endDate <= startDate) {
  return res.json({
      "message": "Validation error",
      "statusCode": 400,
      "errors": {
        "endDate": "endDate cannot be on or before startDate"
      }
    })
  }
  console.log(startDate<endDate)
  const {spotId} = req.params
  const findSpot = await Spot.findOne({where:{
    id:spotId
  }})
  if(!findSpot){
    res.status(404)
    return res.json({
      "message": "Spot couldn't be found",
      "statusCode": 404
    })
  }
  const booked = await Booking.findAll({
    raw:true,
    where:{spotId}
  })
  for (let bookings of booked){
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
  const newBooking = await Booking.create({
    spotId,
    userId:req.user.id,
    startDate,
    endDate,
})
return res.json(newBooking)
})





module.exports = router;