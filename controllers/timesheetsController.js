const Timesheet = require('../models/Timesheet')
const {authenticateToken} = require('../controllers/employeeController')

const getAll = (req, res) => {
  Timesheet.find().limit(2)
  // get timesheets of only the logged in user
  .then(timesheets => res.json(timesheets.filter(timesheet => timesheet.employee.id === req.user.id)))
  .catch(err => res.status(404).json({message: `${err} No timesheets found`}))
}

const getOne = (req, res) => {
  Timesheet.findById(req.params.id)
  .then(timesheet => res.json(timesheet))
  .catch(err => res.json({ message: `${err} Timesheet doesn't exist` }))
}

const createTimesheet = (req, res) => {
  if (!req.body) {
    res.status(400);
    res.json({ message: `No parameters were passed` })
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
  Timesheet.findByIdAndUpdate(req.params.id, req.body)
  .then(timesheet => timesheet.save()
    .then(data => res.status(201).json(data))
  )
  .catch(err => res.status(404).json({ message: `Timesheet with id: ${req.params.id} does not exist` }))
  
}

const deleteTimesheet = (req, res) => {
  Timesheet.findByIdAndDelete(req.params.id, req.body)
  .then(timesheet => res.json({ message: `Timesheet with id: ${req.params.id} has been deleted` }))
  .catch(err => res.status(404).json({ message: `Timesheet with id: ${req.params.id} does not exist` }))
  
}

module.exports = {getAll, getOne, createTimesheet, updateTimesheet, deleteTimesheet}