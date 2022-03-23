const express = require('express');
const USERS = require('../../dev-data/data/users.json');
const usersRouter = express.Router();

//users
usersRouter.get('/', (req, res) => {
  //   res.send('all users');
  console.log('listing all users');
  res.json(USERS);
});

usersRouter.post('/', (req, res) => {
  console.log(req.body);
  USERS.push(req.body);
  res.send(USERS);
});
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

module.exports = usersRouter;
