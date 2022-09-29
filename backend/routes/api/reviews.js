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
//testing testing
//Get all Reviews of the Current User
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
       if(allowPreview){
        spotReviewd.previewImage = allowPreview
       }
       spott.ReviewImages = image
    }
    return res.json(newSpot)
  })


//Add an Image to a Review based on the Review's id
  router.post('/:reviewId/images',requireAuth, async (req, res) => {
    const {reviewId} = req.params
    const {url} = req.body
    const reviewed = await Review.findByPk(reviewId,{where:{userId:req.user.id}})
    if (!reviewed){
        res.status(404)
        return res.json({"message": "Review couldn't be found"})
    }
    const imageExist = await ReviewImage.findOne({where:{reviewId}})
    if(imageExist){
        res.status(403)
        return res.json({"message": "Maximum number of images for this resource was reached"})
    }
    const newImg = await ReviewImage.create({
        reviewId:reviewId,
        url
    })
    const pepe = {}
    pepe.id = newImg.id
    pepe.url = newImg.url

    return res.json(pepe)
  })


  const validateReview = [
    check('review')
      .notEmpty()
      .withMessage('Review text is required'),
      check('stars')
      .notEmpty()
      .isInt({max:5},{min:1})
      .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors]
  //Edit a Review
  router.put('/:reviewId',requireAuth,validateReview, async (req, res) => {
    const {reviewId} = req.params
    const {review,stars} = req.body
    const myReview = await Review.findOne({where:{userId:req.user.id,id:reviewId}})
    if (!myReview){
        res.status(404)
        return res.json({"message": "Review couldn't be found"})
    }
    myReview.review = review
    myReview.stars = stars
    await myReview.save()
    return res.json(myReview)
    })
//...............

    //Delete a Review
router.delete('/:reviewId',requireAuth, async (req, res) => {
        const {reviewId} = req.params
        const myReview = await Review.findByPk(reviewId,{where:{userId:req.user.id}})
        console.log(myReview)
        if(!myReview){
            return res.status(404).json({"message": "Review couldn't be found"})
        }
        await myReview.destroy()
        return res.json({"message": "Successfully deleted"})
   })
//..........
module.exports = router;