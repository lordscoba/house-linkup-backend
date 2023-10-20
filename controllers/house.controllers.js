const expressAsyncHandler = require('express-async-handler');
const handleUpload = require('../utils/upload');
const HouseModel = require('../models/houseModel');
const { tokenHandler } = require('../utils/handleToken');
const UserModel = require('../models/users.model');

const uploadProperty = expressAsyncHandler(async (req, res) => {
  try {
    const {
      state,
      address,
      town,
      poster_phone_number,
      poster_email,
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
      address,
      local_government,
      town,
      description,
      house_type,
      poster_phone_number,
      poster_email,
      status,
      price,
      totalNum_ofToilet,
      totalNum_ofRooms,
      totalNum_ofKitchen,
      totalNum_ofBathroom,
      totalNum_ofParlor,
      image: imageUrl,
      poster: posterId?.fieldToSecure?.id,
    });
    // console.log({ ne: newProperty });

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

// GET UPLOADED HOUSE BY USERID

const getUserHouse = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req?.user?._id;

    const allUploadedProperty = await HouseModel.find({
      poster: userId,
    }).populate('poster', ['_id']);

    const count = await HouseModel.countDocuments();
    const filteredNumber = allUploadedProperty?.length;

    res.status(200).json({
      mapArray: allUploadedProperty,
      docs: count,
      num: filteredNumber,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// DELTE UPLOADED HOUSE BY USERID
const deleteHouseByUser = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req?.user?._id;
    const id = req?.query?.houseId;
    const houseToDelete = await HouseModel.findById(id).populate('poster', [
      '_id',
    ]);

    // CHECK THE UPLOADER

    const isUploader = Boolean(
      houseToDelete?.poster?._id?.toString() === userId
    );

    // const poster = houseToDelete?.poster?._id;
    // console.log({ user: userId, poster: typeof poster });
    if (!isUploader) {
      return res.status(400).json({ message: 'UnAuthorised user' });
    }

    houseToDelete.deleteOne();
    res.status(200).json({ message: 'House deleted Successfully' });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// UPDATE UPLOADED HOUSE BY USERID
const updateHouse = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req?.user?._id;
    // const id = req?.query?.houseId;
    const {
      houseId,
      address,
      state,
      local_government,
      town,
      house_type,
      price,
      description,
      poster_email,
      totalNum_ofToilet,
      totalNum_ofRooms,
      totalNum_ofKitchen,
      totalNum_ofBathroom,
      totalNum_ofParlor,
    } = req?.body;
    const houseToUpdate = await HouseModel.findById(houseId).populate(
      'poster',
      ['_id']
    );

    const isUploader = Boolean(
      houseToUpdate?.poster?._id?.toString() === userId
    );

    // CHECK THE UPLOADER
    if (!isUploader) {
      return res.status(400).json({ message: 'UnAuthorised user' });
    }

    houseToUpdate.address = address;
    houseToUpdate.state = state;
    houseToUpdate.local_government = local_government;
    houseToUpdate.town = town;
    houseToUpdate.house_type = house_type;
    houseToUpdate.price = price;
    houseToUpdate.description = description;
    houseToUpdate.poster_email = poster_email;
    houseToUpdate.totalNum_ofToilet = totalNum_ofToilet;
    houseToUpdate.totalNum_ofRooms = totalNum_ofRooms;
    houseToUpdate.totalNum_ofKitchen = totalNum_ofKitchen;
    houseToUpdate.totalNum_ofBathroom = totalNum_ofBathroom;
    houseToUpdate.totalNum_ofParlor = totalNum_ofParlor;

    await houseToUpdate.save();
    res.status(200).json({ message: 'House Updated Successfully' });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// UPDATE UPLOADED HOUSE IMAGE

const updateHouseImage = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req?.user?._id;
    const { imageId, houseId } = req?.body;
    const houseToUpdate = await HouseModel.findById(houseId).populate(
      'poster',
      ['_id']
    );

    const isUploader = Boolean(
      houseToUpdate?.poster?._id?.toString() === userId
    );

    // CHECK THE UPLOADER
    if (!isUploader) {
      return res.status(400).json({ message: 'UnAuthorised user' });
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

    // FIND IMAGE INDEX
    const imageIndex = houseToUpdate?.image?.findIndex(
      (x) => x?._id.toString() === imageId
    );

    if (imageIndex === -1) {
      return res.status(404).json({ message: 'Image Not Found' });
    }

    const url = imageUrl[0]?.url;

    houseToUpdate.image[imageIndex].url = url;
    houseToUpdate.save();
    res
      .status(200)
      .json({ message: 'Image Updated Successfully', houseToUpdate });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// DELETE UPLOADED HOUSE IMAGE
const deleteHouseImage = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req?.user?._id;
    const { imageId } = req?.body;
    const houseToUpdate = await HouseModel.findById(houseId).populate(
      'poster',
      ['_id']
    );

    const isUploader = Boolean(
      houseToUpdate?.poster?._id?.toString() === userId
    );

    // CHECK THE UPLOADER
    if (!isUploader) {
      return res.status(400).json({ message: 'UnAuthorised user' });
    }

    // FIND IMAGE INDEX
    const imageIndex = houseToUpdate?.image?.findIndex(
      (x) => x?._id === imageId
    );
    if (imageIndex === -1) {
      return res.status(404).json({ message: 'Image Not Found' });
    }

    houseToUpdate.image.splice(imageIndex, 1);
    houseToUpdate.save();
    res.status(200).json({ message: 'Image Deleted Successfully' });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// THIS ROUTE GET'S ALL THE UPLOADED HOUSES BY A USER

const getAllHouse = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.params.id;
    // Find the user by their ID
    const user = await UserModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    const allHouses = await HouseModel.find({ poster: userId })
      .populate('poster', ['full_name'])
      .sort({ createdAt: -1 });

    if (allHouses?.length < 0 || allHouses === null) {
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

  getUserHouse,
  deleteHouseByUser,
  updateHouse,
  updateHouseImage,
  deleteHouseImage,
};
