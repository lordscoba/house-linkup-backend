const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  full_name: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  image: [
    {
      url: {
        type: String,
      },
      publicId: {
        type: String,
      },
    },
  ],
  location: String,
  phone_number: String,
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
