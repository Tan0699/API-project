const express = require('express');
const { setTokenCookie, requireAuth,restoreUser } = require('../../utils/auth');
const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { Review } = require('../../db/models');
const {sequelize} = require('../../db/models')
const {User} = require('../../db/models')



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

  router.delete('/:spotId',requireAuth, async (req, res) => {
    const {spotId} = req.params
    const destroySpot = await Spot.findByPk(spotId,{where:{ownerId:req.user.id}})
    if(!destroySpot){
        return res.status(404).json({"message": "Spot couldn't be found"})
    }
    await destroySpot.destroy()
    return res.json({"message": "Successfully deleted"})
  })

module.exports = router;