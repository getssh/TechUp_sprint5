const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');

const createUser = asyncHandler(async (req, res) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'Permission denied' });
  }

  const { username, email, password, role } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const user = new User({ username, email, password, role });
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error in createUser:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


const updateUser = asyncHandler(async (req, res) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'Permission denied' });
  }

  const userIdToUpdate = req.params.id;
  const { username, email, role } = req.body;
  console.log(req.body);
  try {
    const userToUpdate = await User.findById(userIdToUpdate);
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }

    userToUpdate.username = username;
    userToUpdate.email = email;
    userToUpdate.role = role;

    await userToUpdate.save();

    res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.error('Error in updateUser:', error);
    res.status(500).json({ message: 'Internal Server Errorr' });
  }
});


const deleteUser = asyncHandler(async (req, res) => {
  if (req.user.role !== 'superadmin') {
    return res.status(403).json({ message: 'Permission denied' });
  }

  const userIdToDelete = req.params.id;

  try {
    const userToDelete = await User.findById(userIdToDelete);
    if (!userToDelete) {
      return res.status(404).json({ message: 'User not found' });
    }

    await User.findByIdAndRemove(userIdToDelete);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in deleteUser:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


const getUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const { _id, username, email, role } = user;
    res.status(200).json({ _id, username, email, role });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
};
