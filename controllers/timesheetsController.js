const Timesheet = require('../models/Timesheet')
const {authenticateToken} = require('../controllers/employeeController')

const getAll = (req, res) => {
  if(!req.user.username) {
    return res.json({message: `Please login to see timesheets`})
  }
  Timesheet.find()
  // get timesheets of only the logged in user
  .then(timesheets => res.json(timesheets.filter(timesheet => timesheet.employee == req.user.id)))
  .catch(err => res.status(404).json({message: `${err} You have not created any timesheets yet`}))
}

const getOne = (req, res) => {
  if(!req.user.username) {
    return res.json({message: `Please login to see timesheets`})
  }
  Timesheet.findById(req.params.id)
  .then(timesheet => res.json(timesheet.employee == req.user.id ? timesheet : { message: `You cannot view that timesheet` }))
  .catch(err => res.json({ message: `${err} Timesheet doesn't exist` }))
}

const createTimesheet = (req, res) => {
  if (!req.body) {
    res.status(400).json({ message: `No parameters were passed` })
  }
  else if(!req.user) {
    res.json({message: `Please first log in`})
  }
  else { 
    const newTimesheet = new Timesheet({
      employee: req.user.id,
      hours: req.body.hours,
      description: req.body.description,
      projectID: req.body.projectID
    });
    newTimesheet.employee = req.user.id
    newTimesheet.save()
    .then(timesheet => res.status(201).json(timesheet))
    .catch((err) => res.json(err));
  }
}

const updateTimesheet = (req, res) => {
  if(!req.user.username) {
    return res.json({message: `Please login to see timesheets`})
  }
  Timesheet.findById(req.params.id)
  .then(timesheet => {
    if(timesheet.employee == req.user.id) {
      Timesheet.findByIdAndUpdate(req.params.id, req.body, {new: true})
      .then(timesheet => res.status(201).json(timesheet))
      .catch(err => res.status(404).json({ message: `Timesheet with id: ${req.params.id} does not exist` }))
    }
    else {
      res.json(timesheet.employee == req.user.id ? timesheet : { message: `You cannot update that timesheet` })
    }
    })
    .catch(err => res.json({ message: `${err} Timesheet doesn't exist` }))

  
  
}

const deleteTimesheet = (req, res) => {
  Timesheet.findByIdAndDelete(req.params.id, req.body)
  .then(timesheet => res.json({ message: `Timesheet with id: ${req.params.id} has been deleted` }))
  .catch(err => res.status(404).json({ message: `Timesheet with id: ${req.params.id} does not exist` }))
  
}

module.exports = {getAll, getOne, createTimesheet, updateTimesheet, deleteTimesheet}