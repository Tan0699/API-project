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


// Get all Spots
router.get('/', async (req, res) => {
    //  const starAvg = await Review.findAll({
    //     order:[['userId']],
    //     include: [{model: Review,attributes: ['avgRating']}]})
//done
    const newSpot = {}
    newSpot.Spot = await Spot.findAll({ raw: true })
   
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
}
  );



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
    newSpot.Spot = await Spot.findByPk(spotId,{raw:true})
   
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
            where: {id: spott.id},
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
        return res.json({"message": "Spot couldn't be found",})
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
        return res.json({"message": "Spot couldn't be found"})
    }
    const sameReview = await Review.findAll({where:{userId:req.user.id,
        spotId:findSpot.id}})
    console.log(sameReview)
    if(sameReview.length){
        res.status(403)
        return res.json({ "message": "User already has a review for this spot"})
    }
    const newReview = await Review.create({
        userId:req.user.id,
        spotId:findSpot.id,
        review,
        stars
    })
    return res.json(newReview)
})

module.exports = router;