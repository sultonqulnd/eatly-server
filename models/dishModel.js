const mongoose = require('mongoose');

const dishSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: [true, 'Please add a dish name'],
    },
    category: {
      type: String,
    },
    price: {
      type: Number,
      required: [true, 'Please provide a dish price'],
    },
    time: {
      type: Number,
    },
    rating: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Dish', dishSchema);
