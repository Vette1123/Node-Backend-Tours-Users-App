const express = require('express');
const { authenticated } = require('../../controllers/auth');
// const USERS = require('../../dev-data/data/users.json');
const usersRouter = express.Router();
const {
  getAllUsers,
  createUser,
  uploadAvatar,
} = require('../../controllers/user');

const upload = require('../../utils/file-storage');

usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUser);

// const multer = require('multer');
// const upload = multer({ dest: `${__dirname}/public/storage` });

// //users
// usersRouter.get('/', (req, res) => {
//   //   res.send('all users');
//   console.log('listing all users');
//   res.json(USERS);
// });

// usersRouter.post('/', (req, res) => {
//   console.log(req.body);
//   USERS.push(req.body);
//   res.send(USERS);
// });
usersRouter.patch('/:id', (req, res) => {
  console.log('user updated');
  const user = req.params.id;
  res.send(USERS[user]);
});
usersRouter.delete('/:id', (req, res) => {
  console.log('user deleted');
  const user = req.params.id;
  res.send(USERS[user]);
});

usersRouter.post('/photo', authenticated, upload.single(), uploadAvatar);
module.exports = usersRouter;
