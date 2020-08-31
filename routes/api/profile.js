onst express = require('express');
const router = express.Router();

// route get api/profile
router.get('/', (req, res) => {
  res.json('Profile route');
});

module.exports = {
  router,
};
