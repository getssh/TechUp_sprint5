const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const registerUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password, role } = req.body;

  try {
    const user = new User({ username, email, password, role });
    await user.save();

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.status(200).json({ message: 'Login successful', id: user.id, token });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

module.exports = {
  registerUser,
  loginUser,
};
