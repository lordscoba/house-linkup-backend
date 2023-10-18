const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const HouseSchema = new mongoose.Schema(
  {
    address: { type: String },
    state: { type: String, required: true },
    // city: { type: String, required: true },
    local_government: { type: String, required: true },
    town: { type: String, required: true },
    house_type: { type: String, required: true },
    price: { type: Number, required: true },
    status: { type: String, required: true },
    description: { type: String },
    // lga: { type: String },
    poster: { type: Schema.Types.ObjectId, ref: 'User' },
    poster_phone_number: String,
    poster_email: String,
    totalNum_ofToilet: { type: Number, required: true },
    totalNum_ofRooms: { type: Number, required: true },
    totalNum_ofKitchen: { type: Number, required: true },
    totalNum_ofBathroom: { type: Number, required: true },
    totalNum_ofParlor: { type: Number, required: true },

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
  },
  {
    timestamps: true,
  }
);

const HouseModel = mongoose.model('House', HouseSchema);

module.exports = HouseModel;
