
// backend/routes/api/session.js
const express = require('express');

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { User } = require('../../db/models');

const router = express.Router();
// backend/routes/api/session.js
// backend/routes/api/session.js
// ...
// backend/routes/api/session.js
// ...
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
// ...
// backend/routes/api/session.js
// ...

const validateLogin = [
    check('credential')
      .exists({ checkFalsy: true })
      .notEmpty()
      .withMessage('Please provide a valid email or username.'),
    check('password')
      .exists({ checkFalsy: true })
      .withMessage('Please provide a password.'),
    handleValidationErrors
  ];
// Restore session user
router.get(
    '/',
    restoreUser,
    async (req, res) => {
      const { user } = req;
      const currentUser = await User.findOne({where:{id:user.id},
              attributes:['id','lastName','firstName','email','username']})
      
      if (user) {
        return res.json(
          currentUser
        );
      } else return res.json(null);
    }
  );
  
  // ...
// backend/routes/api/session.js
// ...

// Log out
router.delete(
    '/',
    (_req, res) => {
      res.clearCookie('token');
      return res.json({ message: 'success' });
    }
  );
  
  // ...

// / backend/routes/api/session.js
// ...

// Log in
// backend/routes/api/session.js
// ...

// Log in
router.post(
    '/',
    validateLogin,
    async (req, res, next) => {
      const { credential, password } = req.body;
  
      const user = await User.login({ credential, password });
  
      if (!user) {
        res.status(401)
        return res.json({
          "message": "Invalid credentials",
          "statusCode": 401
        })
      }
     
      const logged = {}
      // logged.user = user 
     let token = await setTokenCookie(res, user);
      logged.id = user.id
      logged.firstName = user.firstName
      logged.lastName = user.lastName
      logged.email = user.email
      logged.username = user.username
      logged.token = token
      return res.json(
        logged
      );
    }
  );
//...
module.exports = router;