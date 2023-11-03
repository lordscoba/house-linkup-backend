const {
  getUserDetails,
  updateProfile,
  changeProfile,
} = require('../controllers/users/profile.controllers');
const profileRoutes = require('express').Router();
const upload = require('../config/file');
const { verifyToken } = require('../utils/handleToken');

profileRoutes.get('/user-details', getUserDetails);
profileRoutes.put('/update-profile/:id', updateProfile);
profileRoutes.put(
  '/update-profile-pic',
  // verifyToken,
  upload.array('image'),
  changeProfile
);

module.exports = profileRoutes;
