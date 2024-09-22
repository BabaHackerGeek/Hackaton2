const express = require('express');
const router = express.Router();
const restaurantsController = require('../../controllers/restaurants');

// Route to get all kosher restaurants
router.get('/', restaurantsController.getAllRestaurants);

// Route to add a new kosher restaurant
router.post('/', restaurantsController.addRestaurant);

// Route to get a specific restaurant by ID
router.get('/:id', restaurantsController.getRestaurantById);

// Route to update a kosher restaurant by ID
router.put('/:id', restaurantsController.updateRestaurant);

// Route to delete a kosher restaurant by ID
router.delete('/:id', restaurantsController.deleteRestaurant);

module.exports = router;
