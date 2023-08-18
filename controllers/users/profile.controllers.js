const expressAsyncHandler = require("express-async-handler");
const UserModel = require("../../models/users.model");
const cloudinary = require("../../config/cloudinary");
const fs = require("fs");

// GET USER DETAILS
const getUserDetails = expressAsyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const userDetails = await UserModel.findOne({ _id: id });

    if (!userDetails) {
      return res.status(404).json({ message: "User Details is empty" });
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
    const { location, phoneNumber } = req?.body;
    if (!req.files) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Upload image to Cloudinary
    // 64d944889c9f98bd62b40e74
    let files = req?.files;
    // console.log({ files: files });

    let multiplePicturePromise = files.map((picture, index) =>
      cloudinary.v2.uploader.upload(picture.path, {
        public_id: `${Date.now()}_${index}`,
        height: 900,
        width: 1400,
        crop: "pad",
      })
    );

    // BELOW RETURNS THE RESOLVED PROMISE OF MULTIPLEPICTUREPROMISE AS AN ARRAY OF OBJECT
    // THAT CAN BE MAPPED
    const imageResponse = await Promise.all(multiplePicturePromise);

    const imageUrl = imageResponse.map((image) => {
      const url = image.secure_url;
      return { url };
    });

    for (const file of files) {
      const { path } = file;
      fs.unlinkSync(path);
    }

    const getUser = await UserModel.findOne({ _id: id });

    if (!getUser) {
      return res.status(404).json({ message: "User Not Found" });
    }

    (getUser.image = imageUrl), (getUser.location = location);
    getUser.phoneNumber = phoneNumber;

    getUser.save();
    return res
      .status(200)
      .json({ message: "Profile updated successfully", getUser });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

module.exports = { getUserDetails, updateProfile };
