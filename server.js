const express = require('express');
const db = require('./config/db');
const { connectDB } = require('./config/db');
const app = express();

connectDB();
const PORT = process.env.PORT || 3000;
app.get('/', (req, res) => {
  res.json('Server up and running');
});

app.listen(PORT, () => {
  console.log(`server is on ${PORT}`);
});
