const sql = require('../project-directory/db'); // PostgreSQL connection from db.js

// Get all kosher restaurants
exports.getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await sql`SELECT * FROM restaurants`;
        res.json(restaurants);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch restaurants' });
    }
};

// Add a new restaurant
exports.addRestaurant = async (req, res) => {
    const { name, address, city, country, category, latitude, longitude } = req.body;
    try {
        const newRestaurant = await sql`
            INSERT INTO restaurants (name, address, city, country, category, latitude, longitude) 
            VALUES (${name}, ${address}, ${city}, ${country}, ${category}, ${latitude}, ${longitude}) 
            RETURNING *`;
        res.status(201).json(newRestaurant[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add restaurant' });
    }
};

// Get restaurant by ID
exports.getRestaurantById = async (req, res) => {
    const { id } = req.params;
    try {
        const restaurant = await sql`SELECT * FROM restaurants WHERE id = ${id}`;
        if (restaurant.length === 0) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.json(restaurant[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch restaurant' });
    }
};

// Update restaurant by ID
exports.updateRestaurant = async (req, res) => {
    const { id } = req.params;
    const { name, address, city, country, category, latitude, longitude } = req.body;
    try {
        const updatedRestaurant = await sql`
            UPDATE restaurants 
            SET name = ${name}, address = ${address}, city = ${city}, country = ${country}, 
                category = ${category}, latitude = ${latitude}, longitude = ${longitude}
            WHERE id = ${id} 
            RETURNING *`;
        if (updatedRestaurant.length === 0) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.json(updatedRestaurant[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update restaurant' });
    }
};

// Delete restaurant by ID
exports.deleteRestaurant = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedRestaurant = await sql`
            DELETE FROM restaurants WHERE id = ${id} RETURNING *`;
        if (deletedRestaurant.length === 0) {
            return res.status(404).json({ error: 'Restaurant not found' });
        }
        res.json({ message: 'Restaurant deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete restaurant' });
    }
};
