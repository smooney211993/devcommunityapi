const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
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
