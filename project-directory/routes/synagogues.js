const express = require('express');
const router = express.Router();
const synagoguesController = require('../../controllers/synagogues');

// Route to get all synagogues
router.get('/', synagoguesController.getAllSynagogues);

// Route to add a new synagogue
router.post('/', synagoguesController.addSynagogue);

// Route to get a single synagogue by ID
router.get('/:id', synagoguesController.getSynagogueById);

// Route to update a synagogue by ID
router.put('/:id', synagoguesController.updateSynagogue);

// Route to delete a synagogue by ID
router.delete('/:id', synagoguesController.deleteSynagogue);

module.exports = router;
