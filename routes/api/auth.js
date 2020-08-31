onst express = require('express');
const router = express.Router();

// route get api/auth
router.get('/', (req, res) => {
  res.json('Auth route');
});

module.exports = {
  router,
};
