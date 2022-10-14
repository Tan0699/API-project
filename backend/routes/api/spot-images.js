//Delete a Spot Image

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


router.delete("/:imageId",requireAuth, async (req, res) => {
    const {imageId} = req.params
    const spotted = await Spot.findOne({where:{ownerId:req.user.id}})
    const spottedImage = await SpotImage.findByPk(imageId,{where:{spodId:spotted.id}})
    if(!spottedImage){
        return res.status(404).json({
            "message": "Spot Image couldn't be found",
            "statusCode": 404
          })
    }
    await spottedImage.destroy()
    return res.json({
        "message": "Successfully deleted",
        "statusCode": 200
      })
    })

 module.exports = router;