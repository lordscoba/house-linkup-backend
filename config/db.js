const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    const connection = await mongoose.connect(
      process.env.MONGO_URI ||
        'mongodb+srv://e2scoba:blockchain@cluster0.b8qy1lb.mongodb.net/house_linkup?retryWrites=true&w=majority',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      }
    );
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
module.exports = connectDB;
