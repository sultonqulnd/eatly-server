const asyncHandler = require('express-async-handler');

const Dish = require('../models/dishModel');
const User = require('../models/userModel');

// @desc    Get dishes
// @route   GET /api/dishes
// @access  Private
const getDishes = asyncHandler(async (req, res) => {
  const dishes = await Dish.find({ user: req.user.id });

  res.status(200).json(dishes);
});

// @desc    Set dish
// @route   POST /api/dishes
// @access  Private
const setDish = asyncHandler(async (req, res) => {
  if (!req.body.name) {
    res.status(400);
    throw new Error('Please add a name field');
  }
  if (!req.body.price) {
    res.status(400);
    throw new Error('Please add a price field');
  }

  const dish = await Dish.create({
    name: req.body.name,
    price: req.body.price,
    category: req.body.category,
    time: req.body.time,
    rating: req.body.rating,
    user: req.user.id,
  });

  res.status(200).json(dish);
});

// @desc    Update dish
// @route   PUT /api/dishes/:id
// @access  Private
const updateDish = asyncHandler(async (req, res) => {
  const dish = await Dish.findById(req.params.id);

  if (!dish) {
    res.status(400);
    throw new Error('Dish not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the dish user
  if (dish.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedDish = await Dish.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedDish);
});

// @desc    Delete dish
// @route   DELETE /api/dishes/:id
// @access  Private
const deleteDish = asyncHandler(async (req, res) => {
  const dish = await Dish.findById(req.params.id);

  if (!dish) {
    res.status(400);
    throw new Error('Dish not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the dish user
  if (dish.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await dish.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getDishes,
  setDish,
  updateDish,
  deleteDish,
};
