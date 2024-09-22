const sql = require('../project-directory/db'); // PostgreSQL connection from db.js

// Get all synagogues
exports.getAllSynagogues = async (req, res) => {
    try {
        const synagogues = await sql`SELECT * FROM synagogues`;
        res.json(synagogues);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch synagogues' });
    }
};

// Add a new synagogue
exports.addSynagogue = async (req, res) => {
    const { name, address, city, country, category, latitude, longitude } = req.body;
    try {
        const newSynagogue = await sql`
            INSERT INTO synagogues (name, address, city, country, category, latitude, longitude) 
            VALUES (${name}, ${address}, ${city}, ${country}, ${category}, ${latitude}, ${longitude}) 
            RETURNING *`;
        res.status(201).json(newSynagogue[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to add synagogue' });
    }
};

// Get synagogue by ID
exports.getSynagogueById = async (req, res) => {
    const { id } = req.params;
    try {
        const synagogue = await sql`SELECT * FROM synagogues WHERE id = ${id}`;
        if (synagogue.length === 0) {
            return res.status(404).json({ error: 'Synagogue not found' });
        }
        res.json(synagogue[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch synagogue' });
    }
};

// Update synagogue by ID
exports.updateSynagogue = async (req, res) => {
    const { id } = req.params;
    const { name, address, city, country, category, latitude, longitude } = req.body;
    try {
        const updatedSynagogue = await sql`
            UPDATE synagogues 
            SET name = ${name}, address = ${address}, city = ${city}, country = ${country}, 
                category = ${category}, latitude = ${latitude}, longitude = ${longitude}
            WHERE id = ${id} 
            RETURNING *`;
        if (updatedSynagogue.length === 0) {
            return res.status(404).json({ error: 'Synagogue not found' });
        }
        res.json(updatedSynagogue[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update synagogue' });
    }
};

// Delete synagogue by ID
exports.deleteSynagogue = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSynagogue = await sql`
            DELETE FROM synagogues WHERE id = ${id} RETURNING *`;
        if (deletedSynagogue.length === 0) {
            return res.status(404).json({ error: 'Synagogue not found' });
        }
        res.json({ message: 'Synagogue deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete synagogue' });
    }
};
