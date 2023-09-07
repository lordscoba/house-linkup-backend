const expressAsyncHandler = require('express-async-handler');
const handleUpload = require('../utils/upload');
const HouseModel = require('../models/houseModel');
const tokenHandler = require('../utils/handleToken');

const uploadProperty = expressAsyncHandler(async (req, res) => {
  try {
    const {
      state,
      city,
      local_government,
      description,
      house_type,
      status,
      price,
      totalNum_ofToilet,
      totalNum_ofRooms,
      totalNum_ofKitchen,
      totalNum_ofBathroom,
      totalNum_ofParlor,
      token,
    } = req?.body;

    if (!req.files) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let files = req?.files;

    let multiplePicturePromise = files.map(async (picture, index) => {
      const b64 = Buffer.from(picture.buffer).toString('base64');
      let dataURI = 'data:' + picture.mimetype + ';base64,' + b64;
      const cldRes = await handleUpload(dataURI, index);
      return cldRes;
    });

    // BELOW RETURNS THE RESOLVED PROMISE OF MULTIPLEPICTUREPROMISE AS AN ARRAY OF OBJECT
    // THAT CAN BE MAPPED
    const imageResponse = await Promise.all(multiplePicturePromise);
    const imageUrl = imageResponse.map((image) => {
      const url = image.secure_url;
      return { url };
    });

    const posterId = tokenHandler?.decodeToken(token);

    const newProperty = await HouseModel.create({
      state,
      city,
      local_government,
      description,
      house_type,
      status,
      price,
      totalNum_ofToilet,
      totalNum_ofRooms,
      totalNum_ofKitchen,
      totalNum_ofBathroom,
      totalNum_ofParlor,
      frontImage: imageUrl,
      poster: posterId?.fieldToSecure?.id,
    });

    if (!newProperty) {
      return res.status(401).json({ message: 'Something went wrong' });
    }

    res
      .status(200)
      .json({ newProperty, message: 'Property uploaded successfully' });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// UPDATE HOUSE

const updateProperty = expressAsyncHandler(async (req, res) => {
  try {
    const houseId = req.params.id;
    const {
      house_location,
      house_type,
      status,
      price,
      totalNum_ofToilet,
      totalNum_ofRooms,
      totalNum_ofKitchen,
      totalNum_ofBathroom,
      totalNum_ofParlor,
      token,
    } = req?.body;
    const getProperty = await HouseModel.findById(houseId);
    const posterId = tokenHandler?.decodeToken(token);

    if (
      JSON.stringify(getProperty?.poster) !==
      JSON.stringify(posterId?.fieldToSecure?.id)
    ) {
      return res.status(400).json({ message: 'UnAurhorized User' });
    }

    if (!getProperty) {
      return res.status(404).json({ message: 'No Property Found' });
    }

    if (!req.files) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let files = req?.files;

    let multiplePicturePromise = files.map(async (picture, index) => {
      const b64 = Buffer.from(picture.buffer).toString('base64');
      let dataURI = 'data:' + picture.mimetype + ';base64,' + b64;
      const cldRes = await handleUpload(dataURI, index);
      return cldRes;
    });

    // BELOW RETURNS THE RESOLVED PROMISE OF MULTIPLEPICTUREPROMISE AS AN ARRAY OF OBJECT
    // THAT CAN BE MAPPED
    const imageResponse = await Promise.all(multiplePicturePromise);
    const imageUrl = imageResponse.map((image) => {
      const url = image.secure_url;
      return { url };
    });

    getProperty.hosue_location = house_location;
    getProperty.house_type = house_type;
    getProperty.status = status;
    getProperty.price = price;
    getProperty.totalNum_ofToilet = totalNum_ofToilet;
    getProperty.totalNum_ofRooms = totalNum_ofRooms;
    getProperty.totalNum_ofKitchen = totalNum_ofKitchen;
    getProperty.totalNum_ofBathroom = totalNum_ofBathroom;
    getProperty.totalNum_ofParlor = totalNum_ofParlor;
    getProperty.kitchen_image = imageUrl;

    getProperty?.save();
    res
      .status(200)
      .json({ message: 'Kitchen Image Updated Successfuly', getProperty });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// UPDATE KITCHEN IMAGE

const uploadKitchenImage = expressAsyncHandler(async (req, res) => {
  try {
    const houseId = req.params.id;
    const getProperty = await HouseModel.findById(houseId);

    if (!getProperty) {
      return res.status(404).json({ message: 'No Property Found' });
    }

    if (!req.files) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let files = req?.files;

    let multiplePicturePromise = files.map(async (picture, index) => {
      const b64 = Buffer.from(picture.buffer).toString('base64');
      let dataURI = 'data:' + picture.mimetype + ';base64,' + b64;
      const cldRes = await handleUpload(dataURI, index);
      return cldRes;
    });

    // BELOW RETURNS THE RESOLVED PROMISE OF MULTIPLEPICTUREPROMISE AS AN ARRAY OF OBJECT
    // THAT CAN BE MAPPED
    const imageResponse = await Promise.all(multiplePicturePromise);
    const imageUrl = imageResponse.map((image) => {
      const url = image.secure_url;
      return { url };
    });

    getProperty.kitchen_image = imageUrl;

    getProperty?.save();
    res
      .status(200)
      .json({ message: 'Kitchen Image Updated Successfuly', getProperty });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// UPDATE PARLOR IMAGE

const uploadParlorImage = expressAsyncHandler(async (req, res) => {
  try {
    const houseId = req.params.id;
    const getProperty = await HouseModel.findById(houseId);

    if (!getProperty) {
      return res.status(404).json({ message: 'No Property Found' });
    }

    if (!req.files) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let files = req?.files;

    let multiplePicturePromise = files.map(async (picture, index) => {
      const b64 = Buffer.from(picture.buffer).toString('base64');
      let dataURI = 'data:' + picture.mimetype + ';base64,' + b64;
      const cldRes = await handleUpload(dataURI, index);
      return cldRes;
    });

    // BELOW RETURNS THE RESOLVED PROMISE OF MULTIPLEPICTUREPROMISE AS AN ARRAY OF OBJECT
    // THAT CAN BE MAPPED
    const imageResponse = await Promise.all(multiplePicturePromise);
    const imageUrl = imageResponse.map((image) => {
      const url = image.secure_url;
      return { url };
    });

    getProperty.parlor_image = imageUrl;

    getProperty?.save();
    res
      .status(200)
      .json({ message: 'Parlor Image Updated Successfuly', getProperty });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// UPDATE TOILET IMAGE

const uploadToiletImage = expressAsyncHandler(async (req, res) => {
  try {
    const houseId = req.params.id;
    const getProperty = await HouseModel.findById(houseId);

    if (!getProperty) {
      return res.status(404).json({ message: 'No Property Found' });
    }

    if (!req.files) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let files = req?.files;

    let multiplePicturePromise = files.map(async (picture, index) => {
      const b64 = Buffer.from(picture.buffer).toString('base64');
      let dataURI = 'data:' + picture.mimetype + ';base64,' + b64;
      const cldRes = await handleUpload(dataURI, index);
      return cldRes;
    });

    // BELOW RETURNS THE RESOLVED PROMISE OF MULTIPLEPICTUREPROMISE AS AN ARRAY OF OBJECT
    // THAT CAN BE MAPPED
    const imageResponse = await Promise.all(multiplePicturePromise);
    const imageUrl = imageResponse.map((image) => {
      const url = image.secure_url;
      return { url };
    });

    getProperty.toilet_image = imageUrl;

    getProperty?.save();
    res
      .status(200)
      .json({ message: 'Toilet Image Updated Successfuly', getProperty });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// UPDATE BATHROOM IMAGE

const uploadBathroomImage = expressAsyncHandler(async (req, res) => {
  try {
    const houseId = req.params.id;
    const getProperty = await HouseModel.findById(houseId);

    if (!getProperty) {
      return res.status(404).json({ message: 'No Property Found' });
    }

    if (!req.files) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    let files = req?.files;

    let multiplePicturePromise = files.map(async (picture, index) => {
      const b64 = Buffer.from(picture.buffer).toString('base64');
      let dataURI = 'data:' + picture.mimetype + ';base64,' + b64;
      const cldRes = await handleUpload(dataURI, index);
      return cldRes;
    });

    // BELOW RETURNS THE RESOLVED PROMISE OF MULTIPLEPICTUREPROMISE AS AN ARRAY OF OBJECT
    // THAT CAN BE MAPPED
    const imageResponse = await Promise.all(multiplePicturePromise);
    const imageUrl = imageResponse.map((image) => {
      const url = image.secure_url;
      return { url };
    });

    getProperty.bathroom_image = imageUrl;

    getProperty?.save();
    res
      .status(200)
      .json({ message: 'Bathroom Image Updated Successfuly', getProperty });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// THIS ROUTE GET'S ALL THE UPLOADED HOUSES

const getAllHouse = expressAsyncHandler(async (req, res) => {
  try {
    const allHouses = await HouseModel.find({})
      .populate('poster', ['full_name'])
      .sort({ createdAt: -1 });

    if (allHouses?.length < 0) {
      return res.status(400).json({ message: 'No House Found' });
    }

    res.status(200).json({ allHouses, message: 'Houses Fetched successfully' });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

module.exports = {
  uploadProperty,
  getAllHouse,

  // update image controllers
  uploadKitchenImage,
  uploadParlorImage,
  uploadBathroomImage,
  uploadToiletImage,
  updateProperty,
};
