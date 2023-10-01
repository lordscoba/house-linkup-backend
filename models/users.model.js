const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    full_name: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String },
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
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    role: {
      type: String,
      enum: ['User', 'Admin', 'SuperAdmin'],
      default: 'User',
    },
    active: {
      type: Boolean,
      default: true,
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    de_activated: {
      type: Boolean,
      default: false,
    },

    location: String,
    phone_number: String,
  },
  {
    timestamps: true,
  }
);

const UserModel = mongoose.model('User', UserSchema);
module.exports = UserModel;
