const express = require('express');
const router = express.Router();

// route get api/users
router.get('/', (req, res) => {
  res.json('User route');
});

module.exports = router;
