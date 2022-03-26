const User = require('../models/User');

module.exports = {
  getAllUsers: async (req, res) => {
    const users = await User.find();
    res.json({
      status: 'success',
      data: users,
    });
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    if (user === null) {
      return next({ status: 'failure', message: 'user not found' });
    }
    res.json({
      status: 'success',
      data: user,
    });
  },
  createUser: async (req, res) => {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });
    res.json({
      status: 'success',
      data: user,
    });
  },
  deleteUser: async (req, res, next) => {
    await User.findByIdAndUpdate(req.user.id, { active: false });
    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
  updateUser: async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.user.id, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: {
        user: updatedUser,
      },
    });
  },
  uploadAvatar: (req, res) => {
    const user = User.findByIdAndUpdate(
      req.userId,
      { avatar: req.file.path },
      { new: true }
    );
    res.json({ status: 'success', data: user });
  },
};
