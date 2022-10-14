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
const review = require('../../db/models/review');


router.delete("/:imageId",requireAuth, async (req, res) => {
    const {imageId} = req.params
    const imaged = await ReviewImage.findByPk(imageId)
    if (!imaged){
      res.status(404)
        return res.json({
            "message": "Review Image couldn't be found",
            "statusCode": 404
          })
    }
    const reviewed = await Review.findOne({where:{userId:req.user.id}})
    if(!reviewed){
      res.status(403)
        return res.json({
            "message": "Forbidden",
            "statusCode": 403
          })
    }
    await imaged.destroy()
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
    })

 module.exports = router;