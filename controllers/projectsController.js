const Project = require('../models/Project');

const getAllProjects = (req, res) => {
  Project.find()
  .then(project => res.json(project))
  .catch(err => res.status(404).json({message: `${err} No projects found`}))
}

const getOneProject = (req, res) => {
  Project.findById(req.params.id)
  .then(project => res.json(project))
  .catch(err => res.json({ message: `${err} Project doesn't exist` }))
}

const createProject = (req, res) => {
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
}

const updateProject = (req, res) => {
  if(!req.body) {
    return res.status(400).json({message:`The message body cannot be empty`})
  }
  Project.findByIdAndUpdate(req.params.id, req.body)
  .then(project => project.save()
    .then(data => res.status(201).json(data))
  )
  .catch(err => res.status(404).json({ message: `Project with id: ${req.params.id} does not exist` }))
  
}

const deleteProject = (req, res) => {
  Project.findByIdAndDelete(req.params.id, req.body)
  .then(project => res.json({ message: `Project with id: ${req.params.id} has been deleted` }))
  .catch(err => res.status(404).json({ message: `Project with id: ${req.params.id} does not exist` }))
  
}

module.exports = {getAllProjects, getOneProject, createProject, updateProject, deleteProject}