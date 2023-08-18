const cloudinary = require("../config/cloudinary");

const upload = async (file, index) => {
  const res = await cloudinary.uploader.upload(file, {
    resource_type: "auto",
  });
  return res;
};

module.exports = upload;
