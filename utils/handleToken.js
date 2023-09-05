const jwt = require('jsonwebtoken');
const tokenHandler = {};
const secret = process.env.JWT_SECRET;

tokenHandler.generateToken = (fieldToSecure, duration) => {
  try {
    return jwt.sign({ fieldToSecure }, process.env.JWT_SECRET, {
      expiresIn: duration ? duration : 18408600000,
    });
  } catch (error) {
    throw new Error(error);
  }
};

tokenHandler.decodeToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET, (err, info) => {
      if (err) throw err;
      return info;
    });
  } catch (error) {
    // res.status(422);
    throw new Error(error);
  }
};

module.exports = tokenHandler;
