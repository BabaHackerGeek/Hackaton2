const express = require('express');
const router = express.Router();
const sql = require('../db');

// Route pour récupérer les synagogues
router.get('/synagogues', async (req, res) => {
    const location = req.query.location;
    // Ajouter la logique pour convertir la ville en coordonnées géographiques

    try {
        const synagogues = await sql`
            SELECT * FROM synagogues
            WHERE city = ${location}
        `;
        res.json(synagogues);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des synagogues' });
    }
});

// Route pour récupérer les restaurants
router.get('/restaurants', async (req, res) => {
    const location = req.query.location;

    try {
        const restaurants = await sql`
            SELECT * FROM restaurants
            WHERE city = ${location}
        `;
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des restaurants' });
    }
});

module.exports = router;
