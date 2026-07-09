const User = require('../models/User');

const getUsers = async (req, res) => {
  const users = await User.find().select('-password');
  return res.status(200).json({
    success: true,
    message: 'Users retrieved successfully',
    data: { users },
  });
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
      errors: ['No user found with this ID'],
    });
  }

  return res.status(200).json({
    success: true,
    message: 'User retrieved successfully',
    data: { user },
  });
};

const createUser = async (req, res) => {
  const user = await User.create(req.body);
  return res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: { user },
  });
};

const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
      errors: ['No user found with this ID'],
    });
  }

  Object.assign(user, req.body);
  await user.save();

  return res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: { user },
  });
};

const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User not found',
      errors: ['No user found with this ID'],
    });
  }

  await user.deleteOne();

  return res.status(200).json({
    success: true,
    message: 'User deleted successfully',
    data: {},
  });
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
