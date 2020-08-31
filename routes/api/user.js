const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
// route get api/users
// register user
//access public
router.post(
  '/',
  [
    body('name', 'Please enter your name').not().isEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    console.log(req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.json('User route');
  }
);

module.exports = router;
