const express = require('express');
const server = express();

const usersRouter = require('./routes/v1/user');
const toursRouter = require('./routes/v1/tours');
const authRouter = require('./routes/v1/auth');

const cors = require('cors');
const multer = require('multer');
const morgan = require('morgan');
const { append } = require('express/lib/response');
const res = require('express/lib/response');
// const upload = multer({ dest: `${__dirname}/public/storage` });

server.use(express.json());
//to serve static pages in public directory
//just type in the url localhost:PORT/filename
server.use(express.static(`${__dirname}/public`));
server.use(morgan('dev'));
//cors Origin to be addeed

server.use('/api/v1/users', usersRouter);
server.use('/api/v1/tours', toursRouter);
server.use('/api/', authRouter);

//to handle any url except tours & users
// append.use(cors());
// corsOptions = {
//   origin: 'http://hmada.com',
// };
server.all('*', (req, res) => {
  res.json({ status: 'failure', message: 'Wrong Url' });
});

//global error handler
server.use((err, req, res, next) => {
  console.log('global error handler');
  res.json(err);
});
module.exports = server;
