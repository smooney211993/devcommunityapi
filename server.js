const express = require('express');
const db = require('./config/db');
const { connectDB } = require('./config/db');
const app = express();
const users = require('./routes/api/user');
const profile = require('./routes/api/profile');
const auth = require('./routes/api/auth');
const post = require('./routes/api/post');
const cors = require('cors');
const path = require('path');

// connect to mongo database
connectDB();
const PORT = process.env.PORT || 3001;
/*app.get('/', (req, res) => {
  res.json('Server up and running');
});*/
// bodyparse middleware
app.use(express.json({ extended: false }));
app.use(cors());
// define routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/auth', auth);
app.use('/api/post', post);

// serve static assets in production
if (process.env.node_ENV === 'production') {
  // set the static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`server is on ${PORT}`);
});
