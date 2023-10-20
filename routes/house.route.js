const {
  uploadProperty,
  getAllHouse,
  // uploadKitchenImage,
  // uploadToiletImage,
  // uploadParlorImage,
  // uploadBathroomImage,
  // updateProperty,
  getUserHouse,
  deleteHouseByUser,
  updateHouse,
  updateHouseImage,
  deleteHouseImage,
} = require('../controllers/house.controllers');
const upload = require('../config/file');
const { verifyToken } = require('../utils/handleToken');

const Houserouter = require('express').Router();

Houserouter.post('/upload-property', upload.array('image'), uploadProperty);

Houserouter.get('/all-property/:id', getAllHouse);
Houserouter.get('/get-user-uploads', verifyToken, getUserHouse);
Houserouter.delete('/delete-house', verifyToken, deleteHouseByUser);
// UPDATE HOUSE
Houserouter.put('/update-house', verifyToken, updateHouse);
Houserouter.put(
  '/update-house-image',
  verifyToken,
  upload.array('image'),
  updateHouseImage
);
Houserouter.delete('/delete-house-image', verifyToken, deleteHouseImage);

module.exports = Houserouter;
