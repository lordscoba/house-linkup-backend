const {
  getAllUsers,
  deleteUser,
  activateUser,
  deActivateUser,
  blockUser,
  promoteUser,
  demoteUser,
} = require('../controllers/users.controller');

const UserRouter = require('express').Router();

UserRouter.get('/all-users', getAllUsers);
UserRouter.delete('/delete-user/:id', deleteUser);

UserRouter.put('/activate-user/:id', activateUser);
UserRouter.put('/deactivate-user/:id', deActivateUser);
UserRouter.put('/block-user/:id', blockUser);
UserRouter.put('/promote-user/:id', promoteUser);
UserRouter.put('/demote-user/:id', demoteUser);

module.exports = UserRouter;
