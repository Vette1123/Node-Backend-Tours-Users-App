const User = require('../models/User');
const { catchAsync } = require('../utils/utils');
const jwt = require('jsonwebtoken');

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
module.exports = {
  login: catchAsync(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.json({
        status: 'failure',
        message: 'Please provide email or password.',
      });
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.json({
        status: 'failure',
        message: 'incorrect email or password.',
      });
    }
    const token = signToken(user._id);

    res.status(201).json({
      status: 'success, user logged in sucessfully',
      token,
      data: user,
    });
  }),

  signup: catchAsync(async (req, res, next) => {
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    const token = signToken(newUser._id);
    res.status(201).json({
      status: 'success',
      token,
      data: newUser,
    });
  }),
};
