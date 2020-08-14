const express = require('express');
const router = express.Router();
const {getAllProjects, getOneProject, createProject, updateProject, deleteProject} = require('../controllers/projectsController')


// get all projects
router.get('/', getAllProjects);

// Get project by id
router.get('/:id', getOneProject);

// Create a new project
router.post('/new-project', createProject)

// Update a project
router.get('/:id', updateProject);

// Update a project
router.get('/:id', deleteProject);

module.exports = router;