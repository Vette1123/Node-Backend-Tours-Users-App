const express = require('express');
const server = express();
const usersRouter = require('./routes/v1/user');
const toursRouter = require('./routes/v1/tours');

server.use(express.json());

server.use('/api/v1/users', usersRouter);
server.use('/api/v1/tours', toursRouter);

module.exports = server;
