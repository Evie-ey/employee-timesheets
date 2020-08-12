const express = require('express');
const router = express.Router();
const Timesheet = require('../models/Timesheet')

// Get all timesheets
router.get('/timesheets', (req, res) => {
  Timesheet.find()
  .then(timesheets => res.json(timesheets))
  .catch(err => res.status(404).json({message: 'No timesheets found'}))
});

// Get timesheets by id
router.get('/timesheets/:id', (req, res) => {
  Timesheet.findById(req.params.id)
  .then(timesheet => res.json(timesheet))
  .catch(err => res.json({ message: `${err} Timesheet doesn't exist` }) )
});

router.post("/", (req, res) => {
  if (!req.body) {
    res.status(400);
    res.json({ message: `No parameters were passed` })
  }
  else {
    const newTimesheet = new Timesheet({
      projectName: req.body.projectName,
      hours: req.body.hours,
      description: req.body.description,
      employee: req.body.employee
    });
    newTimesheet.save().then(post => res.status(201).json(post));


  }
})

module.exports = router;
