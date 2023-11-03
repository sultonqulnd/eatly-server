const express = require('express');
const router = express.Router();
const {
  getDishes,
  setDish,
  updateDish,
  deleteDish,
} = require('../controllers/dishController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getDishes).post(protect, setDish);
router.route('/:id').delete(protect, deleteDish).put(protect, updateDish);

module.exports = router;
