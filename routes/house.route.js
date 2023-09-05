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

const Houserouter = require('express').Router();

Houserouter.post(
  '/upload-property',
  upload.array('front_image'),
  uploadProperty
);

// UPDATE ROUTES

Houserouter.put(
  '/update-property',
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

Houserouter.get('/all-property', getAllHouse);

module.exports = Houserouter;
