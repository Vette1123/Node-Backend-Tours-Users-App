const User = require('../models/User');
const { compare } = require('bcryptjs');
const { catchAsync } = require('../utils/utils');
const jwt = require('jsonwebtoken');

module.exports = {
  login: catchAsync(async (req, res) => {
    const { email, password } = req.body;
    //find email
    const user = await User.findOne({ email });
    //match password
    const match = await compare(password, user.password);
    if (!user || !match) {
      //   return res.json('logged in successfully');
      res.json({ status: 'failure', message: 'invalid email or password' });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '2d',
    });
    res.json({ status: 'success', token });
  }),
  signup: () => {},
  authenticated: (req, res, next) => {
    const token = req.headers.Authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const { id } = decodedToken;
    req.userId = id;
    console.log(decodedToken);
    if (decodedToken) {
      return next();
    }
    res.json({
      status: 'failure',
      message: 'Youre not authenticated',
    });
  },
};
