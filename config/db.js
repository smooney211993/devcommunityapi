const mongoose = require('mongoose');
const config = require('config');
// imported the connection string
const db = config.get('mongoURI');

// function to connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('mongoose db connect');
  } catch (error) {
    console.log(error.message);
    process.exit();
  }
};

module.exports = {
  connectDB: connectDB,
};
