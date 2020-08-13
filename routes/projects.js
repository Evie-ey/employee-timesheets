const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

// get all projects
router.get('/', (req, res) => {
  Project.find()
  .then(project => res.json(project))
  .catch(err => res.status(404).json({message: `${err} No projects found`}))
});

// Get project by id
router.get('/:id', (req, res) => {
  Project.findById(req.params.id)
  .then(project => res.json(project))
  .catch(err => res.json({ message: `${err} Project doesn't exist` }))
});



module.exports = router;