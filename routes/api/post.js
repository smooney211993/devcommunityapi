const express = require('express');
const router = express.Router();
const authToken = require('../../middleware/auth');
const { body, validationResult } = require('express-validator');
const Post = require('../../modules/Post');
const User = require('../../modules/User');
const Profile = require('../../modules/Profile');
// route get api/post
// create post
// webtoken needed
router.post(
  '/',
  authToken,
  [body('text', 'Text is required').not().isEmpty()],
  async (req, res) => {
    const { text } = req.body;
    const errors = validationResult(req);
    if (!errors) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const user = await User.findById(req.user.id).select('-password');
      const newPost = {
        text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };
      const post = new Post(newPost);
      await post.save();
      res.json(post);
    } catch (error) {
      console.log(error.message);
      res.status(500).json('Server Error');
    }
  }
);

// api/post
// get all post
// webtoken need
router.get('/', authToken, async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error');
  }
});
module.exports = router;
