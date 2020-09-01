const express = require('express');
const router = express.Router();
const authToken = require('../../middleware/auth');
const Profile = require('../../modules/Profile');
const User = require('../../modules/User');

// route get api/profile/me
// get current users profile private via jsonwebtoken
router.get('/me', authToken, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('users', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server error');
  }
});

module.exports = router;
S;
