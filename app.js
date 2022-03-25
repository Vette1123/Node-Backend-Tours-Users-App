const express = require('express');
const server = express();
const usersRouter = require('./routes/v1/user');
const toursRouter = require('./routes/v1/tours');
const authRouter = require('./routes/v1/auth');
const cors = require('cors');
const multer = require('multer');
const upload = multer({ dest: `${__dirname}/public/storage` });

server.use(express.json());
server.use(express.static(`${__dirname}/public`));
//cors Origin to be addeed

server.use('/api/v1/users', usersRouter);
server.use('/api/v1/tours', toursRouter);
server.use('/api/', authRouter);
corsOptions = {
  origin: 'http://hmada.com',
};
//to handle any url except tours & users

server.all('*', (req, res) => {
  res.json({ status: 'failure', message: 'Wrong Url' });
});

//global error handler
server.use((err, req, res, next) => {
  console.log('global error handler');
  res.json(err);
});
module.exports = server;
