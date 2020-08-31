const express = require('express');
const router = express.Router();
const authToken = require('../../middleware/auth');
const User = require('../../modules/User');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// route get api/auth
router.get('/', authToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('server error');
  }
});

// authenticate and get token
router.post(
  '/',
  [
    body('email', 'Please include a valid email').not().isEmpty(),
    body('password', 'password is required').exists(),
  ],
  async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credentials' }] });
      }
      // if user does not exist send error message
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'invalid credentials' }] });
      }
      // if user password does not match the hashed password, send error message
      const payload = {
        user: {
          id: user.id,
        },
      };
      // create payload for the webtoken
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
      // send the token if succesfully signed in
    } catch (error) {
      console.log(error.message);
      res.status(500).json('server error');
    }
  }
);
module.exports = router;
