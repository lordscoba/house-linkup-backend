const expressAsyncHandler = require('express-async-handler');
const UserModel = require('../models/users.model');

// USER'S CONTROLLER

const getAllUsers = expressAsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = parseInt(req.query.limit) || 10; // Number of users per page

  try {
    const totalCount = await UserModel.countDocuments(); // Count total number of users
    const totalPages = Math.ceil(totalCount / limit); // Calculate total number of pages

    const Users = await UserModel.find({})
      .skip((page - 1) * limit)
      .limit(limit);
    if (!Users) {
      return res.status(400).json({ message: 'No User Found' });
    }

    res.status(200).json({
      Users,

      totalPages,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// DELETE USER
//****** */
const deleteUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    console.log(userId);
    if (!user) {
      return res.status(404).json({ message: 'User Details is empty' });
    }

    user.deleteOne();
    // user.save()
    return res.status(200).json({
      message: `${user?.full_name} has been deleted Successfully`,
      user,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// ACTIVATE USER
const activateUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not Found' });
    }

    user.active = true;
    user.de_activated = false;
    user.blocked = false;
    user.save();
    res.status(200).json({
      message: `${user?.full_name}  is Activated Successfully `,
      user,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// DEACTIVATE USER
const deActivateUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not Found' });
    }

    user.de_activated = true;
    user.active = false;
    user.blocked = false;
    user.save();
    res.status(200).json({
      message: `${user?.full_name}  is De-Activated Successfully `,
      user,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// BLOCK USER
const blockUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not Found' });
    }

    user.de_activated = false;
    user.active = false;
    user.blocked = true;
    user.save();
    res
      .status(200)
      .json({ message: `${user?.full_name} is Blocked Successfully `, user });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// PROMOTE USER TO ADMIN
const promoteUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not Found' });
    }

    const isSuperAdmin = user?.role === 'SuperAdmin';

    if (!isSuperAdmin) {
      return res.status(404).json({ message: 'UnAuthorized User.' });
    }
    user.role = 'Admin';
    user.save();
    res.status(200).json({
      message: `${user?.full_name}  is Activated Successfully `,
      user,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// DEMOTE ADMIN TO USER
const demoteUser = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not Found' });
    }

    const isSuperAdmin = user?.role === 'SuperAdmin';

    if (!isSuperAdmin) {
      return res.status(404).json({ message: 'UnAuthorized User.' });
    }
    user.role = 'User';
    user.save();
    res.status(200).json({
      message: `${user?.full_name}  is Activated Successfully `,
      user,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

module.exports = {
  getAllUsers,
  deleteUser,
  activateUser,
  deActivateUser,
  blockUser,
  promoteUser,
  demoteUser,
};
