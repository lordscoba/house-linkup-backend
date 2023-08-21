const expressAsyncHandler = require('express-async-handler');
const UserModel = require('../../models/users.model');
const handleUpload = require('../../utils/upload');

// GET USER DETAILS
const getUserDetails = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    // console.log({ id: req.params?.id });

    const userDetails = await UserModel.findById(userId);
    console.log({ user: userDetails });

    if (!userDetails) {
      return res.status(404).json({ message: 'User Details is empty' });
    }

    return res.status(200).json(userDetails);
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// UPDATE PROFILE
const updateProfile = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req?.params;
    const { location, phone_number } = req?.body;
    if (!req.files) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Upload image to Cloudinary
    // 64d944889c9f98bd62b40e74
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

    const getUser = await UserModel.findOne({ _id: id });
    if (!getUser) {
      return res.status(404).json({ message: 'User Not Found' });
    }

    (getUser.image = imageUrl), (getUser.location = location);
    getUser.phone_number = phone_number;

    getUser.save();
    return res
      .status(200)
      .json({ message: 'Profile updated successfully', getUser });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

module.exports = { getUserDetails, updateProfile };
