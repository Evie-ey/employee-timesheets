const express = require('express');
const router = express.Router();
const Timesheet = require('../models/Timesheet')

// const timesheetData = [{ id: 1, projectName: "BoU", hours: 2, description: "Added new names" }, { id: 2, projectName: "Emata", "hours": 3, description: "Added new names" }]
const timesheetData = []

router.get('/timesheets', (req, res) => {
  Timesheet.find()
  .then(timesheets => res.json(timesheets))
  .catch(err => res.status(404).json({message: 'No timesheets found'}))
  // res.json(timesheetData);
});

router.get('/timesheets/:id([0-9]{1,})', (req, res) => {
  const timesheetId = req.params.id;
  const timesheet = timesheetData.filter((timesheet) => {
    return timesheet.id == timesheetId
  });

  if (timesheet.length > 0) {
    res.json(timesheet[0])
  } else {
    res.status(404);
    res.json({ message: `Timesheet ${timesheetId} doesn't exist` })
  }
});

router.post("/", (req, res) => {
  console.log(req.body.projectName, 'hahaha')
  if (!req.body) {
    res.status(400);
    res.json({ message: `No parameters were passed` })
  }
  else {
    const newTimesheet = new Timesheet({
      id: timesheetData[timesheetData.length - 1].id + 1,
      dateCreated: req.body.dateCreated,
      projectName: req.body.projectName,
      hours: req.body.hours,
      description: req.body.description,
      employee: req.employee.id
    });
    newTimesheet.save().then(post => res.status(201).json(post));


  }
})

module.exports = router;
