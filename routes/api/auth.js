const express = require('express');
const router = express.Router();
const authToken = require('../../middleware/auth');
const User = require('../../modules/User');

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

module.exports = router;
