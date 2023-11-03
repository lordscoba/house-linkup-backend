const expressAsyncHandler = require('express-async-handler');
const UserModel = require('../models/users.model');

// USER'S CONTROLLER

const getAllUsers = expressAsyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Current page number
  const limit = parseInt(req.query.limit) || 3; // Number of users per page

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
      totalUsers: totalCount,
      totalPages,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// DELETE USER
//****** */
const deleteUser = expressAsyncHandler(async (req, res) => {
  try {
    const loggedInUser = req?.user?._id;
    const userId = req.params.id;

    const user = await UserModel.findById(userId?.toString());

    // const assumedAdmin = await UserModel.findById(loggedInUser);
    // const isAdmin = assumedAdmin?.role === 'SuperAdmin';

    // if (!isAdmin) {
    //   return res.status(400).json({ message: 'Unauthorised User' });
    // }
    if (!user) {
      return res.status(404).json({ message: 'User not Found' });
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
  try {
    const loggedInUser = req?.user?._id;
    const userId = req.params.id;

    const user = await UserModel.findById(userId?.toString());

    // const assumedAdmin = await UserModel.findById(loggedInUser);
    // const isAdmin = assumedAdmin?.role === 'SuperAdmin';

    // if (!isAdmin) {
    //   return res.status(400).json({ message: 'Unauthorised User' });
    // }
    if (!user) {
      return res.status(404).json({ message: 'User not Found' });
    }

    user.active = true;
    user.de_activated = false;
    user.blocked = false;
    user.save();
    res.status(200).json({
      message: `${user?.full_name}   Activated Successfully `,
      user,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// DEACTIVATE USER
const deActivateUser = expressAsyncHandler(async (req, res) => {
  try {
    const loggedInUser = req?.user?._id;
    const userId = req.params.id;

    const user = await UserModel.findById(userId?.toString());

    // const assumedAdmin = await UserModel.findById(loggedInUser);
    // const isAdmin = assumedAdmin?.role === 'SuperAdmin';

    // if (!isAdmin) {
    //   return res.status(400).json({ message: 'Unauthorised User' });
    // }
    if (!user) {
      return res.status(404).json({ message: 'User not Found' });
    }

    user.de_activated = true;
    user.active = false;
    user.blocked = false;
    user.save();
    res.status(200).json({
      message: `${user?.full_name}   De-Activated Successfully `,
      user,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// BLOCK USER
const blockUser = expressAsyncHandler(async (req, res) => {
  try {
    const loggedInUser = req?.user?._id;
    const userId = req.params.id;

    const user = await UserModel.findById(userId?.toString());

    // const assumedAdmin = await UserModel.findById(loggedInUser);
    // const isAdmin = assumedAdmin?.role === 'SuperAdmin';

    // if (!isAdmin) {
    //   return res.status(400).json({ message: 'Unauthorised User' });
    // }
    if (!user) {
      return res.status(404).json({ message: 'User not Found' });
    }

    user.de_activated = false;
    user.active = false;
    user.blocked = true;
    user.save();
    res
      .status(200)
      .json({ message: `${user?.full_name}  Blocked Successfully `, user });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// PROMOTE USER TO ADMIN
const promoteUser = expressAsyncHandler(async (req, res) => {
  try {
    const loggedInUser = req?.user?._id;
    const userId = req.params.id;

    const user = await UserModel.findById(userId?.toString());

    // const assumedAdmin = await UserModel.findById(loggedInUser);
    // const isAdmin = assumedAdmin?.role === 'SuperAdmin';

    // if (!isAdmin) {
    //   return res.status(400).json({ message: 'Unauthorised User' });
    // }
    if (!user) {
      return res.status(404).json({ message: 'User not Found' });
    }

    user.role = 'Admin';
    user.save();
    res.status(200).json({
      message: `${user?.full_name}  is Promoted Successfully `,
      user,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// DEMOTE ADMIN TO USER
const demoteUser = expressAsyncHandler(async (req, res) => {
  try {
    const loggedInUser = req?.user?._id;
    const userId = req.params.id;

    const user = await UserModel.findById(userId?.toString());

    // const assumedAdmin = await UserModel.findById(loggedInUser);
    // const isAdmin = assumedAdmin?.role === 'SuperAdmin';
    // const isToDemoteSuperAdmin = user?.role === 'SuperAdmin';

    // if (!isAdmin) {
    //   return res.status(400).json({ message: 'Unauthorised User' });
    // }
    if (!user) {
      return res.status(404).json({ message: 'User not Found' });
    }

    if (isToDemoteSuperAdmin) {
      return res
        .status(400)
        .json({ message: "Nah, You can't demote Super Admin" });
    }

    user.role = 'User';
    user.save();
    res.status(200).json({
      message: `${user?.full_name}  is Demoted Successfully `,
      user,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

// PROMOTE USER TO POSTER

const promoteToPoster = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.body?.userId;
    const loggedInUser = req?.user?._id;
    const user = await UserModel.findById(userId);
    const assumedAdmin = await UserModel.findById(loggedInUser);

    const isAdmin = assumedAdmin?.role === 'SuperAdmin';

    if (!isAdmin) {
      return res.status(400).json({ message: 'Unauthorised User' });
    }

    const promotedUsername = user?.full_name;

    user.role = 'Poster';

    await user.save();

    res.status(200).json({
      message: `${promotedUsername} has been promoted to Poster`,
      user,
    });
  } catch (error) {
    res.status(500).json(error?.message);
  }
});

const demotePoster = expressAsyncHandler(async (req, res) => {
  try {
    const userId = req.body?.userId;
    const loggedInUser = req?.user?._id;
    const user = await UserModel.findById(userId);
    const assumedAdmin = await UserModel.findById(loggedInUser);

    const isAdmin = assumedAdmin?.role === 'SuperAdmin';

    if (!isAdmin) {
      return res.status(400).json({ message: 'Unauthorised User' });
    }

    const userDemoted = user?.full_name;

    user.role = 'User';

    await user.save();

    res.status(200).json({
      message: `${userDemoted} has been demoted to User`,
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
  promoteToPoster,
  demotePoster,
};
