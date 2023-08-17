const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  fullName: { type: String, required: true, unique: true },
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
  // image: [],
  location: String,
  phoneNumber: String,
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel;
