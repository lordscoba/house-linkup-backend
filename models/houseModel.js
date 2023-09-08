const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HouseSchema = new mongoose.Schema(
  {
    // hosue_location: { type: String },
    state: { type: String, required: true },
    city: { type: String, required: true },
    local_government: { type: String, required: true },
    house_type: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    description: { type: String },
    poster: { type: Schema.Types.ObjectId, ref: 'User' },

    totalNum_ofToilet: { type: Number, required: true },
    totalNum_ofRooms: { type: Number, required: true },
    totalNum_ofKitchen: { type: Number, required: true },
    totalNum_ofBathroom: { type: Number, required: true },
    totalNum_ofParlor: { type: Number, required: true },
    front_image: [
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
