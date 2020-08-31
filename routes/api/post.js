const express = require('express');
const router = express.Router();

// route get api/post
router.get('/', (req, res) => {
  res.json('Post route');
});

module.exports = router;
