const jwt = require('jsonwebtoken');
const config = require('config');

const authToken = (req, res, next) => {
  //get token from the header
  const token = req.header('x-auth-token');
  // if no token send error message
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization not granted' });
  }

  try {
    // if token is valid, decode and then will set req.user to the user that is in the decoded token.
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'token is not valid' });
    // if token does exist but however valid send this error message
  }
};

module.exports = authToken;
