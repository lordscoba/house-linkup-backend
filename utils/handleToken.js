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

const verifyToken = async (req, res, next) => {
  try {
    let token = req.header('Authorization');

    if (!token) {
      return res.status(403).send('Access Denied');
    }

    if (token.startsWith('Bearer ')) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;

    next();
  } catch (error) {
    res.status(500).json({ error: error?.message });
  }
};

module.exports = { tokenHandler, verifyToken };
