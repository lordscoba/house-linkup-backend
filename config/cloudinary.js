// Cloudinary config goes under here
const cloudinary = require("cloudinary");
const dotenv = require("dotenv");
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "amazing1917",
  api_key: process.env.CLOUD_API_KEY || "466119532983772",
  api_secret: process.env.CLOUD_API_SECRET || "rXNtC1phVGn79H2FPp4Nr7gOY9M",
});

module.exports = cloudinary;
