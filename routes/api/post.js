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
    const post = await Post.find().sort({ date: -1 });
    res.json(post);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error');
  }
});
// get post by id
// webtoken needed
router.get('/:id', authToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }
    res.json(post);
  } catch (error) {
    console.log(error.message);
    if (error.kind === 'ObjectId') {
      return res.status(404).json('Post not found');
    }
    res.status(500).json('Server Error');
  }
});

// delete post
// router api/post/:id
router.delete('/:id', authToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check the user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(404).json({ msg: 'User not authorized' });
    }
    await post.remove();
    res.json({ msg: 'Post Removed' });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json('Post not found');
    }
    res.status(500).json('Server Error');
  }
});

// put api/post/like/:id
// like a post
// webtoken needed
router.put('/like/:id', authToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check if post has already been liked by this user
    if (post.likes.find((like) => like.user.toString() === req.user.id)) {
      return res.status(400).json('Post already liked');
    }

    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server Error');
  }
});

// api/unlike/:id
// unlike post
// webtoken needed
router.put('/unlike/:id', authToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    // check to see if the post has been liked
    const likedByUser = post.likes.find(
      (like) => like.user.toString() === req.user.id
    );
    console.log(likedByUser);
    if (!likedByUser) {
      return res.status(400).json('Post has not been liked');
    }
    // removed the liked post
    const updated = post.likes.filter(
      (like) => like.user.toString() !== likedByUser.user.toString()
    );
    post.likes = updated;
    await post.save();
    res.json(post.likes);
  } catch (error) {
    console.log(error.message);
    res.status(500).json('Server error');
  }
});

// route api/posts/comment/
//comment on post
//private
router.post(
  '/comments/:id',
  [authToken, body('text', 'Text is required').not().isEmpty()],
  async (req, res) => {}
);

module.exports = router;
