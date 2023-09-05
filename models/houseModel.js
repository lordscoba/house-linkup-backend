const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HouseSchema = new mongoose.Schema(
  {
    hosue_location: { type: String },
    house_type: { type: String },
    price: { type: Number },
    status: { type: String },
    poster: { type: Schema.Types.ObjectId, ref: 'User' },

    totalNum_ofToilet: { type: Number },
    totalNum_ofRooms: { type: Number },
    totalNum_ofKitchen: { type: Number },
    totalNum_ofBathroom: { type: Number },
    totalNum_ofParlor: { type: Number },
    frontImage: [
      {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },
    ],

    kitchen_image: [
      {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },
    ],

    parlor_image: [
      {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },
    ],
    toilet_image: [
      {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },
    ],
    bathroom_image: [
      {
        url: {
          type: String,
        },
        publicId: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const HouseModel = mongoose.model('House', HouseSchema);

module.exports = HouseModel;
