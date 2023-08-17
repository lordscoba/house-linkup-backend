const {
  getUserDetails,
  updateProfile,
} = require("../controllers/users/profile.controllers");
const profileRoutes = require("express").Router();
const upload = require("../config/file");

profileRoutes.get("/user-details/:id", getUserDetails);
profileRoutes.put("/update-profile/:id", upload.array("image"), updateProfile);

module.exports = profileRoutes;
