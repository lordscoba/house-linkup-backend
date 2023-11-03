const {
  getAllUsers,
  deleteUser,
  activateUser,
  deActivateUser,
  blockUser,
  promoteUser,
  demoteUser,
  promoteToPoster,
  demotePoster,
} = require('../controllers/users.controller');
const { verifyToken } = require('../utils/handleToken');

const UserRouter = require('express').Router();

UserRouter.get('/all-users', getAllUsers);
UserRouter.delete(
  '/delete-user/:id',
  // verifyToken
  deleteUser
);

UserRouter.put(
  '/activate-user/:id',
  //  verifyToken,
  activateUser
);
UserRouter.put(
  '/deactivate-user/:id',
  //  verifyToken,
  deActivateUser
);
UserRouter.put(
  '/block-user/:id',
  // verifyToken,
  blockUser
);
UserRouter.put(
  '/promote-user/:id',
  // , verifyToken
  promoteUser
);
UserRouter.put(
  '/demote-user/:id',
  // verifyToken,
  demoteUser
);
UserRouter.put('/promote-user-to-poster', verifyToken, promoteToPoster);
UserRouter.put('/demote-poster-to-user', verifyToken, demotePoster);

module.exports = UserRouter;
