const {
  uploadProperty,
  getAllHouse,
  uploadKitchenImage,
  uploadToiletImage,
  uploadParlorImage,
  uploadBathroomImage,
  updateProperty,
} = require('../controllers/house.controllers');
const upload = require('../config/file');
const { verifyToken } = require('../utils/handleToken');

const Houserouter = require('express').Router();

Houserouter.post('/upload-property', upload.array('image'), uploadProperty);

// UPDATE ROUTES

Houserouter.put(
  '/update-property/front-image',
  upload.array('front_image'),
  updateProperty
);

Houserouter.put(
  '/update-property/kitchen-image',
  upload.array('kitchen_image'),
  uploadKitchenImage
);
Houserouter.put(
  '/update-property/parlor-image',
  upload.array('parlor_image'),
  uploadParlorImage
);
Houserouter.put(
  '/update-property/toilet-image',
  upload.array('toilet_image'),
  uploadToiletImage
);
Houserouter.put(
  '/update-property/bathroom-image',
  upload.array('bathroom_image'),
  uploadBathroomImage
);

//END OF UPDATE ROUTES

Houserouter.get('/all-property/:id', getAllHouse);

module.exports = Houserouter;
