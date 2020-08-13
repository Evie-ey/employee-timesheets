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

// Create a new project
router.post('/new-project', (req, res) => {
  if (!req.body) {
    res.status(400);
    res.json({ message: `No parameters were passed` })
  }
  else {
    const newProject = new Project({
      companyName: req.body.companyName,
      projectName: req.body.projectName,
      code: req.body.code,
      projectItems: req.body.projectItems
    });
    newProject.save().then(project => res.status(201).json(project));
  }
})

module.exports = router;