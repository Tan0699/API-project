// backend/routes/api/users.js

const express = require('express');

const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
// backend/routes/api/users.js
// ...
// backend/routes/api/users.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...
// backend/routes/api/users.js
// ...
const validateSignup = [
    check('email')
      .exists({ checkFalsy: true })
      .isEmail()
      .withMessage('Please provide a valid email.'),
    check('username')
      .exists({ checkFalsy: true })
      .isLength({ min: 4 })
      .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
      .not()
      .isEmail()
      .withMessage('Username cannot be an email.'),
    check('password')
      .exists({ checkFalsy: true })
      .isLength({ min: 6 })
      .withMessage('Password must be 6 characters or more.'),
      check('firstName')
     .notEmpty()
      .withMessage("First Name is required"),
      check('lastName')
      .exists({ checkFalsy: true })
      .withMessage("Last Name is required"),
    handleValidationErrors
  ];
  // backend/routes/api/users.js
// ...

// Sign up
router.post(
    '/',
    validateSignup,
    async (req, res) => {
      const { firstName,lastName,email,username,password } = req.body;
      console.log(firstName)
      console.log(lastName,"lmao")
      const emailinvalid = await User.findOne({
        where:{email}
      })
      if(emailinvalid){
        return res.status(403).json({
          "message": "User already exists",
          "statusCode": 403,
          "errors": {
            "email": "User with that email already exists"
          }
        })
      }
      const user = await User.signup({firstName,lastName,email, username, password });
      console.log( user.firstName)
      console.log( user.lastName)
      const logged = {}
      // logged.user = user 
     let token = await setTokenCookie(res, user);
     console.log( user)
     console.log( user.lastName)
      logged.id = user.id
      logged.firstName = firstName
      logged.lastName = lastName
      logged.email = email
      logged.username = username
      logged.token = token
      return res.json(
        logged
      );
    }
  );
// Sign up



module.exports = router;