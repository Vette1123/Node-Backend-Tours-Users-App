const express = require('express');
// const USERS = require('../../dev-data/data/users.json');
const usersRouter = express.Router();
const {
  getAllUsers,
  createUser,
  deleteUser,
  updateUser,
  uploadAvatar,
} = require('../../controllers/user');

const upload = require('../../utils/file-storage');

usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUser);

usersRouter.patch('/:id', updateUser);
usersRouter.delete('/:id', deleteUser);

usersRouter.post('/photo', upload.single(), uploadAvatar);
module.exports = usersRouter;
