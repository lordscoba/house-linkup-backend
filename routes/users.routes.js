const express = require('express');
const {
  register,
  login,
  getUserDetails,
  updateProfile,
} = require('../controllers/users.controllers');
const multer = require('multer');

const router = express.Router();

// // Multer Configuration
// const storage = multer.memoryStorage();
// const upload = multer({ storage });
const upload = multer({ dest: 'uploads/' });

router.post('/register', register);
router.post('/login', login);
router.get('/user-details/:id', getUserDetails);
router.post('/update-profile/:id', upload.array('image'), updateProfile);

module.exports = router;
